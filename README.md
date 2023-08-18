# Northcoders News API


This project is an API that simulates the backend of a news platform similar to Reddit. It provides various endpoints to access topics, articles, comments, and user information programmatically.


The hosted version can be found at: https://news-api-ney0.onrender.com

 The projects front-end repo can be found: https://github.com/HarrietHall/News



To run this project locally, you'll need:

- Node.js (minimum version required: v20.0.0)
- PostgreSQL (version 13 or later recommended)


To get the project running locally on your machine, follow these steps:

1. Clone the repository:
  
    - git clone https://github.com/HarrietHall/News-API
    - cd be-nc-news
    
2. Connect to the database:

    Create two .env files : 

    <.env.test> 
    <.env.development> 

Into the test file, add PGDATABASE=nc_news_test

Into the development file, add PGDATABASE=nc_news

3. Install the local dependencies:
    
    - npm install
    
4. Seed the database: 
   
    - npm run seed 

5. Start the server: 

    - npm start 

6. Run the tests:

    -cd __tests__
    - npm test


