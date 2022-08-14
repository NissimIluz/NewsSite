from datetime import datetime
from app_server.constants.collections_names import CollectionsNames
from app_server.constants.database_constants.logger_fields import LoggerFields
from app_server.dal.infra_dal.intraface_dal import IDal
from app_server.dependency_injector import get_singleton
from app_server.enums.logger_level import LoggerLevel


dal: IDal = get_singleton(IDal)


def add_log(level: LoggerLevel, message):
    new_log = {
        LoggerFields.message: message,
        LoggerFields.level: level.value,
        LoggerFields.log_date: datetime.utcnow()
    }
    return dal.insert_async(CollectionsNames.logger, new_log, with_generic_fields=False)
