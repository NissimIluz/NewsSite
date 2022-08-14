import flask
from flask import Blueprint
from app_server.controllers.base_controller import server_response, error_response, validate, ok
from app_server.enums.error_codes import ErrorCodes
from app_server.schemas.comments_schema import CommentsSchema
from app_server.services import comments_service

comments_controller = Blueprint('comments_controller', __name__)


@comments_controller.route('', methods=['GET'])
async def get_comments():
    try:
        article_id = flask.request.args.get("articleId", None)
        ret_val = await comments_service.get_comments(article_id)
        return ok(ret_val)
    except Exception as ex:
        return await error_response(ex)


@comments_controller.route('/add', methods=['PUT'], endpoint='add_comment')
async def add_comment():
    try:
        comment = flask.request.json
        validate_response = await validate(CommentsSchema, comment)
        if validate_response.status:
            comment = validate_response.data
            ret_val = await comments_service.add_comment(comment)
            return server_response(ret_val)
        else:
            return await error_response(error_code=ErrorCodes.schemaError, data=validate_response.data)
    except Exception as ex:
        return await error_response(ex)


@comments_controller.route('/reportComment', methods=['PUT'], endpoint='search')
async def search():
    try:
        comment_id = flask.request.args.get("commentId", None)
        ret_val = await comments_service.report_comment(comment_id)
        return server_response(ret_val)
    except Exception as ex:
        return await error_response(ex)


@comments_controller.route('/edit', methods=['POST'])
async def edit():
    try:
        comment = flask.request.json
        validate_response = await validate(CommentsSchema, comment)
        if validate_response.status:
            comment = validate_response.data
            ret_val = await comments_service.edit_comment(comment)
            return server_response(ret_val)
        else:
            return await error_response(error_code=ErrorCodes.schemaError, data=validate_response.data)
    except Exception as ex:
        return await error_response(ex)

