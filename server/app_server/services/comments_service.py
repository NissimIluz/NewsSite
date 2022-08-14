from app_server.constants.database_constants.comments_fields import CommentsFields
from app_server.dal.dal_services import dal_comments
from app_server.enums.comment_status import CommentStatus


def get_comments(article_id):
    return dal_comments.get_comments(article_id)


def add_comment(comment):
    comment[CommentsFields.status] = CommentStatus.approve.value
    comment[CommentsFields.number_of_reported] = 0
    return dal_comments.add_comments(comment)


def report_comment(comment_id):
    return dal_comments.report_comment(comment_id)


def edit_comment(comment):
    update_comment = {
        CommentsFields.status: comment[CommentsFields.status],
        CommentsFields.title: comment[CommentsFields.title],
        CommentsFields.author: comment[CommentsFields.author],
        CommentsFields.content_text: comment[CommentsFields.content_text],
        CommentsFields.comment_father_id: comment[CommentsFields.comment_father_id],
    }
    return dal_comments.edit_comment(update_comment, comment[CommentsFields.id])