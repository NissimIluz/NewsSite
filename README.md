# NewsSite
A news site with a data management system


## Client side: Angular 14.0.7.

## Server side: python 3.10 with mongoDB data structure.
• Includes a cache layer.
• The cache settings and other settings of the server can be changed in the app_server/configuration.py file
• You can adjust the connection string app_server/configuration.py

## Operating:

### server
1. Make sure python  3.10 or a adapted version is installed.
2. Run pip install -r requirements.txt
3. Run python3.10 main.py

### client
1. Make sure Angular 14.0.7 or a verified version is installed.
2. Run npm i
3. The server must be activated through a proxy by:  ```ng serve --proxy-config proxy.config.json```

The site presents a list of articles loaded from the DB. You can choose an article. Selecting an article will open the article for reading.
The article can contain HTML elements and thus display the article as an HTML file with a custom design.

## Description
### Features:
1. Adding a comment. You can add a comment to each article.
2. Reply to an existing comment. You can respond to every comment (infinitely...).
3. Reporting on comment. After reporting a comment, the comment will be removed until helpDesk decides (using a comment management system).
4. Sharing articles on social networks.
and more...

### The site (article pages and the article reader) are fully responsive for mobile.


### The site also contains a HelpDesk information management system which allows:
1. Manage the articles on the website:
  * Displaying the articles in a table with filtering and sorting options (by clicking on the column title).
  * Adding articles.
  * Editing articles.
  * Promotion of articles.
2. Manage the comments on the website:
  * Displaying the responses in a table with filtering and sorting options (by clicking on the column header).
  * Displaying the number of reports per comment
  * Block or approve comments.

### future tasks:
1. Require authentication before entering the information management system. After the authentication, token will be sent, the token will be used by the client in API requests.
2. Block the information management pages for those who are not  authorized.
3. Block the information management system requests on the server  and allow access only after identification using a token.
