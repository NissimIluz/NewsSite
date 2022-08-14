from app_server.constants.database_constants.general_fields import GeneralFields


class CommentsFields(GeneralFields):
    number_of_reported = 'numberOfReported'
    article_id = 'articleId'
    title = 'title'
    author = 'author'
    content_text = 'contentText'
    status = 'status'
    comment_father_id = 'commentFatherId'