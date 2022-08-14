from app_server.constants.database_constants.article_fields import ArticleFields
from app_server.dal.dal_services import dal_news


def get_all_articles():
    return dal_news.get_all_articles()


def add_article(json_data):
    return dal_news.add_article(json_data)


def get_article(article_id):
    return dal_news.get_article(article_id)


def search(search_phrase):
    return dal_news.search(search_phrase)


def edit_article(json_data):
    update = {
        ArticleFields.title: json_data[ArticleFields.title],
        ArticleFields.sub_title: json_data[ArticleFields.sub_title],
        ArticleFields.author: json_data[ArticleFields.author],
        ArticleFields.content: json_data[ArticleFields.content],
        ArticleFields.promotion: json_data[ArticleFields.promotion]
    }
    return dal_news.update_article(update, json_data[ArticleFields.id])