from abc import ABC, abstractmethod
from pymongo import MongoClient, ReturnDocument
from app_server.models.ResponseDTO import Response


class IDal(ABC):
    @abstractmethod
    def __init__(self):
        pass

    @abstractmethod
    def create_connection(self) -> MongoClient:
        pass

    @abstractmethod
    def create_async_connection(self) -> MongoClient:
        pass

    @abstractmethod
    def insert_async(self, collection, documents, with_generic_fields=True) -> Response:
        pass

    @abstractmethod
    def update_async(self, collection, filter_by, new_data=None, update_command=None,
                           upsert=False, bypass_document_validation=False,
                           collation=None, array_filters=None, hint=None,
                           session=None, multy=False, update_last_update_date=True):
        pass

    @abstractmethod
    def find_one_async(self, collection, filter_by, sort: [] = None):
        pass

    @abstractmethod
    def find_all_async(self, collection, filter_by={}, select={}):
        pass

    @abstractmethod
    def count_documents_async(self, collection, filter_by={}):
        pass

    @abstractmethod
    def remove_async(self, collection, _id) -> Response:
        pass

    @abstractmethod
    def find_one_and_remove_async(self, collection, filter_by) -> Response:
        pass

    @abstractmethod
    def find_one_and_update_async(self, collection, filter_by, update, or_rule=False,
                                  sort: [] = [], upsert=False, array_filters=None,
                                  return_document=ReturnDocument.BEFORE):
        pass

    @abstractmethod
    def join(self, left_collection, right_collection, field_left_collection, field_right_collection, filter_by={},
             only_active=True, result_name='joinedResult', nested=False, match=None):
        pass

    @abstractmethod
    def aggregate_async(self, collection, aggregate_array: [], filter_by={}):
        pass
