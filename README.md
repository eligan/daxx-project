# DAXX Project API


## Before starting server please make sure that:
* Your mongod is running on localhost:27017, otherwise change mongodb url in config to yours
* All packages are installed


## Requirements:
* Write a simple microservices with CRUD actions to maintain a user-database
* Wildcard (partial) search on mail/names & city
* It must be written in NodeJS and exposing a REST API on OpenAPI 3.0 specification
* The REST API must comply to the Google API Guidelines: https://cloud.google.com/apis/design/
* Use a Mongo database and commit the code to GIT
* Data-model:
⋅⋅⋅ * Email address (required, unique + validated)
⋅⋅⋅ * Password (required, 7 alphanumeric characters and 1 capital letter)
⋅⋅⋅ * First name (required, 25 chars)
⋅⋅⋅ * Last name (required, 25 chars)
⋅⋅⋅ * City (optional, 25 chars)
* Automated tests
