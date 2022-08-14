from app_server.models.ErrorDTO import Error


class Response:
    def __init__(self, status: bool = True, data=None, error: Error = None):
        self.status = status
        self.data = data
        self.error = error
