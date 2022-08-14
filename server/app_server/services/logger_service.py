import json
from app_server import configuration
from app_server.dal.dal_services import dal_logger
from app_server.enums.logger_level import LoggerLevel


def info(ex):
    return _log(ex, LoggerLevel.info)


def warning(ex):
    return _log(ex, LoggerLevel.warning)


def error(ex):
    return _log(ex, LoggerLevel.error)


def critical(ex):
    return _log(ex, LoggerLevel.critical)


def _log(ex, level: LoggerLevel):
    try:
        if type(ex) is dict:
            message = json.dumps(ex)
        else:
            message = str(ex)

        if level.value >= configuration.print_from_level:
            print(message)

        return dal_logger.add_log(level, message)


    except Exception as error:
        print(message, level, error)
