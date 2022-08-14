from datetime import datetime
import _asyncio
import pymongo
from motor import motor_asyncio
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from app_server import configuration
from app_server.constants.database_constants.general_fields import GeneralFields
from app_server.dal.infra_dal.intraface_dal import IDal
from app_server.enums.error_codes import ErrorCodes
from app_server.models.ErrorDTO import Error
from app_server.models.ResponseDTO import Response
from app_server.services import logger_service


class MongodbDal(IDal):
    def __init__(self):
        self.connection_string = configuration.mangoDB_connection
        self.database = configuration.database_name

    def create_connection(self):
        mongo_db: MongoClient = pymongo.MongoClient(self.connection_string)
        return mongo_db[self.database]

    def create_async_connection(self):
        mongo_db: MongoClient = motor_asyncio.AsyncIOMotorClient(self.connection_string)
        return mongo_db[self.database]

    async def insert_async(self, collection, documents, with_generic_fields=True) -> Response:
        connection = self.create_async_connection()
        cursor = connection[collection]

        if with_generic_fields:
            if type(documents) is list:
                for document in documents:
                    document[GeneralFields.create_date] = datetime.utcnow
                    document[GeneralFields.update_date] = None
            else:
                documents[GeneralFields.create_date] = datetime.utcnow()
                documents[GeneralFields.update_date] = None

        if type(documents) is list:
            result: _asyncio.Future = cursor.insert_many(documents)
        else:
            result: _asyncio.Future = cursor.insert_one(documents)

        try:
            response: pymongo.results = await result
            if type(documents) is list:
                ret_val = Response(response.acknowledged)
            else:
                ret_val = Response(response.acknowledged, data=str(response.inserted_id))
        except pymongo.errors.DuplicateKeyError as ex:
            ret_val = Response(False, None, Error(ErrorCodes.duplicateKeyError))
            await logger_service.info(ex)
        except Exception as ex:
            ret_val = Response(False, None, Error())
            await logger_service.critical(ex)
        return ret_val

    async def update_async(self, collection, filter_by, new_data=None, update_command=None, upsert=False,
                           bypass_document_validation=False,
                           collation=None, array_filters=None, hint=None,
                           session=None, multy=False, update_last_update_date=True):
        if update_command is None:
            update_command = {"$set": new_data}
        if update_last_update_date:
            new_data[GeneralFields.update_date] = datetime.utcnow()
        connection = self.create_async_connection()
        cursor = connection[collection]
        ret_val = Response()
        try:
            if multy:
                resp = await cursor.update_many(filter_by, update_command, upsert, array_filters,
                                                bypass_document_validation, collation, hint, session)
            else:
                resp = await cursor.update_one(filter_by, update_command, upsert,
                                               bypass_document_validation,
                                               collation, array_filters, hint,
                                               session)
            ret_val.data = resp.raw_result["updatedExisting"] or (upsert and resp.raw_result.get('upserted'))

        except Exception as ex:
            logger_service.error(ex)
            ret_val.status = False
            ret_val.error = Error()
        return ret_val

    def find_one_async(self, collection, filter_by, sort: [] = []):
        connection = self.create_async_connection()
        cursor = connection[collection]
        
        if not sort:
            return cursor.find_one(filter=filter_by)
        else:
            return cursor.find_one(filter=filter_by, sort=sort)

    def find_all_async(self, collection, filter_by={}, select={}):
        connection = self.create_async_connection()
        cursor = connection[collection]
        return cursor.find(filter_by, select)

    def count_documents_async(self, collection, filter_by={}):
        
        connection = self.create_async_connection()
        cursor = connection[collection]
        return cursor.count_documents(filter_by)

    async def remove_async(self, collection, filter_by) -> Response:
        connection = self.create_async_connection()
        cursor = connection[collection]
        try:
            result = await cursor.delete_many(filter=filter_by)
            return Response(status=result.deleted_count > 0, information=result.deleted_count)
        except Exception as ex:
            logger_service.error(ex)
            return Response(status=False, message=Responses.UnknownError, information=0)

    def find_one_and_remove_async(self, collection, filter_by) -> Response:
        connection = self.create_async_connection()
        cursor = connection[collection]
        return cursor.find_one_and_delete(filter=filter_by)

    def find_one_and_update_async(self, collection, filter_by, update, or_rule=False,
                                  sort: [] = [], upsert=False, array_filters=None, return_document=ReturnDocument.BEFORE):
        if not sort:
            sort = None
        connection = self.create_async_connection()
        cursor = connection[collection]
        return cursor.find_one_and_update(filter=filter_by, update=update, sort=sort, upsert=upsert,
                                          array_filters=array_filters, return_document=return_document)

    def join(self, left_collection, right_collection, field_left_collection, field_right_collection, filter_by={},
             only_active=True, result_name='joinedResult', nested=False, match=None):
        aggregate_array = [
            {
                '$lookup': {
                    'from': right_collection,
                    f'localField': field_left_collection,
                    f'foreignField': field_right_collection,
                    f'as': result_name
                }
            }
        ]
        if nested and match is None:
            aggregate_array.append({"$match": {result_name: {"$ne": []}}})
        elif match is not None:
            aggregate_array.append({"$match": match})
        ret_val = self.aggregate_async(collection=left_collection, aggregate_array=aggregate_array, filter_by=filter_by,
                                       only_active=only_active)
        return ret_val

    def aggregate_async(self, collection, aggregate_array: [], filter_by={}):
        
        connection = self.create_async_connection()
        cursor = connection[collection]
        return cursor.aggregate(aggregate_array)

    def create_index(self, collection, keys, name, unique=True):
        connection = self.create_connection()[collection]
        try:
            results = 5
            results = connection.create_index(keys, unique=unique, name=name)
        except Exception as ex:
            print(ex)
        print(results)

    @staticmethod
    async def _create_response(response) -> Response:
        try:
            result: pymongo.results = await response
            return Response(result.acknowledged)
        except pymongo.errors.DuplicateKeyError as ex:
            message = Responses.DuplicateKeyError
            logger_service.info(ex)
            return Response(False, message, ex.details['keyValue'])

        except Exception as ex:
            logger_service.error(ex)
            message = Responses.UnknownError
            return Response(False, message)

    @staticmethod
    def create_all_index():
        self: IMongodbDal = MongodbDal()
        self.create_index("Scholarships", [('isActive', pymongo.ASCENDING), ('organizationId', pymongo.ASCENDING),
                                           ('name', pymongo.ASCENDING)], "scholarships_index")

        self.create_index("Candidates", [('isActive', pymongo.ASCENDING), ('username', pymongo.ASCENDING)],
                          "candidate_username")
        self.create_index("Candidates", [('isActive', pymongo.ASCENDING), ('phoneNumber', pymongo.ASCENDING)],
                          "candidate_phone_number")
        self.create_index("Candidates", [('isActive', pymongo.ASCENDING), ('email', pymongo.ASCENDING)],
                          "candidate_email")

        self.create_index("OrganizationContact", [('isActive', pymongo.ASCENDING), ('username', pymongo.ASCENDING)],
                          "organization_contact_username")
        self.create_index("OrganizationContact", [('isActive', pymongo.ASCENDING), ('phoneNumber', pymongo.ASCENDING)],
                          "organization_contact_phone_number")
        self.create_index("OrganizationContact", [('isActive', pymongo.ASCENDING), ('email', pymongo.ASCENDING)],
                          "organization_contact_email")

        self.create_index("Organizations", [('isActive', pymongo.ASCENDING), ('organizationName', pymongo.ASCENDING)],
                          "organization_name")
