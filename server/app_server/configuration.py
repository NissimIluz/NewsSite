""" app """
secret_key = 'same key for this app'
validate_input=True

""" database """
mangoDB_connection = 'mongodb+srv://nissim:kzda8qSWgl6Y3XVa@cluster0.f1r39y7.mongodb.net/?retryWrites=true&w=majority'
database_name = "News"
''' logger'''
print_from_level = 0  # info = 0, warning = 1, error = 2, critical = 3

""" news cache"""
get_all_news_ttl = 1  # Time To Live in seconds
get_article_ttl = 1  # Time To Live in seconds
get_comments_ttl = 1   # Time To Live in seconds
maxsize = 1024
