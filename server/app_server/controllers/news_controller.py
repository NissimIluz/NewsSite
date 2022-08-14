import flask
from flask import Blueprint
from app_server.controllers.base_controller import server_response, error_response, validate, ok
from app_server.enums.error_codes import ErrorCodes
from app_server.schemas.article_schema import ArticleSchema
from app_server.services import news_service

news_controller = Blueprint('news_controller', __name__)


@news_controller.route('/', methods=['GET'])
async def get_all_articles():
    try:
        resp = await news_service.get_all_articles()
        return ok(resp)
    except Exception as ex:
        return await error_response(ex)


@news_controller.route('/addArticle', methods=['POST'], endpoint='add_article')
async def add_article():
    try:
        json_data = flask.request.json
        validate_response = await validate(ArticleSchema, json_data)
        if validate_response.status:
            json_data = validate_response.data
            return server_response(await news_service.add_article(json_data))
        else:
            return await error_response(error_code=ErrorCodes.schemaError, data=validate_response.data)
    except Exception as ex:
        return await error_response(ex)


@news_controller.route('/search', methods=['GET'], endpoint='search')
async def search():
    try:
        search_phrase = flask.request.args.get("searchPhrase", None)
        ret_val = await news_service.search(search_phrase)
        return ok(ret_val)
    except Exception as ex:
        return await error_response(ex)


@news_controller.route('/getArticleById', methods=['GET'], endpoint='get_article')
async def get_article():
    try:
        article_id = flask.request.args.get("articleId", None)
        ret_val = await news_service.get_article(article_id)
        return ok(ret_val)
    except Exception as ex:
        return await error_response(ex)


@news_controller.route('/editArticle', methods=['POST'], endpoint='edit_article')
async def edit_article():
    try:
        json_data = flask.request.json
        validate_response = await validate(ArticleSchema, json_data)
        if validate_response.status:
            json_data = validate_response.data
            response = await news_service.edit_article(json_data)
            return server_response(response)
        else:
            return await error_response(error_code=ErrorCodes.schemaError, data=validate_response.data)
    except Exception as ex:
        return await error_response(ex)
