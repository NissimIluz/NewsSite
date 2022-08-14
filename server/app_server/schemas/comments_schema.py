import string
from marshmallow import Schema, fields, validate


class CommentsSchema(Schema):
    _id = fields.String(required=False, allow_none=True)
    articleId = fields.String(required=False, allow_none=True)
    title = fields.String(required=True, validate=validate.Regexp('^[1-9א-תa-zA-Z .,!@#$%^&*:/\n)(_+-]{2,50}$'))
    author = fields.String(required=True, validate=validate.Regexp('^[1-9א-תa-zA-Z .,!@#$%^&*:\n)(_+-]{2,50}$'))
    contentText = fields.String(required=True, validate=validate.Regexp('^[1-9א-תa-zA-Z .,!@#$%^&*:\n)(_+-]{5,5000}$'))
    createDate = fields.String(required=False, allow_none=True)
    updateDate = fields.String(required=False, allow_none=True)
    status = fields.Number(required=False, allow_none=True)
    commentFatherId = fields.String(required=True,allow_none=True, validate=validate.Regexp(f'^[{string.digits + string.ascii_letters}]'+'{5,50}$'))
    numberOfReported = fields.Number(required=False, allow_none=True)

