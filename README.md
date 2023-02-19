How to run it?

- First you need to spin up the database. To do this run:
`>> cd mondodb`
`>> docker-compose up`
This will create a mongoDB container with a shared volume that will persist data so it won't be lost in case the container goes down.

- To run the backend run:
`>> cd rf-backend-challenge`
`>> npm run compile`
`>> npm run start`
This will create a server running in localhost:3030 with a REST API serving the following endpoints:

(( Rellenar aqui con endpoints ))