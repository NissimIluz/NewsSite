import string
import random

from cache import AsyncTTL

from app_server import configuration
from app_server.constants.collections_names import CollectionsNames
from app_server.constants.database_constants.comments_fields import CommentsFields
from app_server.constants.database_constants.general_fields import GeneralFields
from app_server.dal.infra_dal.intraface_dal import IDal
from app_server.dependency_injector import get_singleton
from app_server.enums.comment_status import CommentStatus

dal: IDal = get_singleton(IDal)
generate_random_string = lambda n: ''.join([random.choice(string.ascii_letters + string.digits) for i in range(n)])


@AsyncTTL(time_to_live=configuration.get_comments_ttl, maxsize=configuration.maxsize)
async def get_comments(article_id=None):
    if article_id is None:
        filter_by = {}
    else:
        filter_by = {CommentsFields.article_id: article_id, CommentsFields.status: CommentStatus.approve.value}
    response = await dal.find_all_async(CollectionsNames.comments, filter_by).to_list(None)
    return response


def add_comments(comment):
    comment[GeneralFields.id] = generate_random_string(20)
    return dal.insert_async(CollectionsNames.comments, comment)


def report_comment(comment_id):
    update_command = {
        "$set": {CommentsFields.status: CommentStatus.reported.value},
        "$inc": {CommentsFields.number_of_reported: 1}
    }
    filter_by = {CommentsFields.id: comment_id}
    return dal.update_async(CollectionsNames.comments, filter_by=filter_by, update_command=update_command, update_last_update_date=False)


def edit_comment(update_comment, comment_id):
    return dal.update_async(CollectionsNames.comments, filter_by={CommentsFields.id: comment_id}, new_data=update_comment)