from app_server.enums.error_codes import ErrorCodes


class Error:
    def __init__(self, errorCode: ErrorCodes = ErrorCodes.genericError, errorMessage=None):
        self.errorCode = errorCode.value
        if not errorMessage:
            self.errorMessage = errorCode.name
        else:
            self.errorMessage = errorMessage