# playstore-server

This is a simple server that exposes a fictional list of apps in a playstore. It recieves GET requests with 2 optional query parameters "sort" and "genres". If "sort" is present, the results in the JSON file in the response are sorted by the given "sort" parameter. If "genres" is present, only apps in the genre matching the "genres" query parameter will be included in the response. I used Mocha, Chai, and Supertest to make a robust test file.

In the future, as an exercise, I could make a frontend to go along with this server.

Built with Node, Express, Mocha, Chai, Supertest.