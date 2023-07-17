# Northcoders News API

<!-- A link to the hosted version.
https://news-api-ney0.onrender.com
A summary of what the project is.

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using node-postgres.


Clear instructions of how to clone, install dependencies, seed local database, and run tests.
Information about how to create the two .env files.
The minimum versions of Node.js, and Postgres needed to run the project. -->

instruction for connecting to the databases:

Create two .env files : 

<.env.test> 
<.env.development> 


Into each, add PGDATABASE=, with the correct database name for that environment (these names can be found in the setup.sql)

Into the test file, add PGDATABASE=nc_news_test

Into the development file, add PGDATABASE=nc_news


You'll need to run npm install at this point.