from app_server.dal.infra_dal.dal_imp.mongodb import MongodbDal
from app_server.dal.infra_dal.intraface_dal import IDal

services_pointer = {}  # interface: instance
interface_implementations = {  # interface: impl
    IDal: MongodbDal
}


def get_singleton(interface: any, *params):
    if interface not in services_pointer:
        new = interface_implementations[interface](*params)
        services_pointer.update({interface: new})
    return services_pointer[interface]


def get_transient(interface: any, *params):
    retval = interface_implementations[interface](*params)
    return retval
