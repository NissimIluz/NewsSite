from cache import AsyncTTL
from app_server import configuration
from app_server.constants.collections_names import CollectionsNames
from app_server.constants.database_constants.article_fields import ArticleFields
from app_server.dal.infra_dal.intraface_dal import IDal
from app_server.dependency_injector import get_singleton
import random
import string

dal: IDal = get_singleton(IDal)

generate_random_string = lambda n: ''.join([random.choice(string.ascii_letters + string.digits) for i in range(n)])


@AsyncTTL(time_to_live=configuration.get_all_news_ttl, maxsize=configuration.maxsize)
async def get_all_articles():
    select = {ArticleFields.create_date: 1, ArticleFields.update_date: 1, ArticleFields.title: 1,  ArticleFields.author: 1,
              ArticleFields.sub_title: 1, ArticleFields.promotion: 1}
    result = await dal.find_all_async(
        collection=CollectionsNames.articles,
        select=select
    ).to_list(None)
    return result


@AsyncTTL(time_to_live=configuration.get_article_ttl, maxsize=configuration.maxsize)
async def get_article(article_id):
    result = await dal.find_one_async(collection=CollectionsNames.articles, filter_by={ArticleFields.id: article_id})
    return result


def add_article(article):
    article[ArticleFields.id] = generate_random_string(15)
    return dal.insert_async(collection=CollectionsNames.articles, documents=article)


def search(search_phrase):
    select = {ArticleFields.create_date: 1, ArticleFields.update_date: 1, ArticleFields.title: 1,  ArticleFields.author: 1,
              ArticleFields.sub_title: 1, ArticleFields.promotion: 1}
    filter_by = {"$or": [{ArticleFields.title:  {'$regex': search_phrase}}, {ArticleFields.sub_title: {'$regex': search_phrase}},{ArticleFields.create_date: {'$regex': search_phrase}}, {ArticleFields.author: {'$regex': search_phrase}}, {ArticleFields.content: {'$regex': search_phrase}}]}
    ret_val = dal.find_all_async(
        collection=CollectionsNames.articles,
        filter_by=filter_by,
        select=select
    ).to_list(None)
    return ret_val


def update_article(update, article_id):
    filter_by = {ArticleFields.id: article_id}
    return dal.update_async(CollectionsNames.articles, filter_by, update)