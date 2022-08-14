from marshmallow import Schema, fields


class ArticleSchema(Schema):
    _id = fields.String(required=False, allow_none=True)
    title = fields.String(required=True)
    content = fields.String(required=True)
    author = fields.String(required=True)
    subTitle = fields.String(required=True)
    promotion = fields.Number(required=True)
    updateDate = fields.String(required=False, allow_none=True)
    createDate = fields.String(required=False, allow_none=True)