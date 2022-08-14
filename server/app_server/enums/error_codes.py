from enum import IntEnum


class ErrorCodes(IntEnum):
    schemaError = 5
    genericError = 0,
    duplicateKeyError = 1,
    InvalidInput = 4