from enum import IntEnum


class CommentStatus(IntEnum):
    approve = 0,
    create = 1,
    blocked = 3,
    reported = 4