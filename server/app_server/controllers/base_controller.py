import inspect
from types import NoneType
from flask import jsonify
from marshmallow import Schema
from app_server import configuration
from app_server.enums.error_codes import ErrorCodes
from app_server.models.ErrorDTO import Error
from app_server.models.ResponseDTO import Response
from app_server.services import logger_service


primitive = (int, str, bool, NoneType, dict, list)


def server_response(data, status_code=200):
    if inspect.isclass(type(data)) and type(data) is not list:
        dict_data = class_to_dict(data)
    response = jsonify(dict_data), status_code
    return response


def ok(data, status_code=200):
    return server_response(Response(data=data),status_code)


async def error_response(data=None, error_code: ErrorCodes = ErrorCodes.genericError, error_message=None):
    if not error_message:
        error_message = error_code.name
    await logger_service.error(error_message)
    return server_response(Response(False, data, Error(error_code, error_message)))


def class_to_dict(clss_instance):
    dict_class = {}
    for member in inspect.getmembers(clss_instance):
        if not member[0].startswith('_') and not inspect.ismethod(member[1]):
            if type(member[1]) in primitive:
                dict_class[member[0]] = member[1]
            else:
                dict_class[member[0]] = class_to_dict(member[1])
    return dict_class


async def validate(schema: Schema, data) -> Response:
    if configuration.validate_input:
        schema = schema()
        validator_result = schema.validate(data)
        if len(validator_result) == 0:
            data = schema.load(data)
            ret_val = Response(True, data)
        else:
            ret_val = Response(False, validator_result, Error(ErrorCodes.InvalidInput))
            await logger_service.error(validator_result)
    else:
        ret_val = Response(True, data)
    return ret_val
