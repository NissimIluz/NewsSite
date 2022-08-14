from flask import Flask
from app_server import configuration


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = configuration.secret_key
    app.config["MONGO_URI"] = configuration.mangoDB_connection

    # load controllers
    ## import to controllers
    from .controllers.news_controller import news_controller
    from .controllers.comments_controller import comments_controller

    ## register controllers
    app.register_blueprint(news_controller, url_prefix='/api/news')
    app.register_blueprint(comments_controller, url_prefix='/api/comments')

    return app
