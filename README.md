## Init Docker


First installation

`docker-compose build`

Wait for everything to be configured

Then:

`docker-compose up -d`

Once all the containers are initialized, you need to connect to the backend container:

`docker exec -t -i local_backend /bin/bash`

we will find ourselves already in the folder / var / www / backend

we install all the dependencies:

`composer install`

For the backend it is not necessary to execute the command php artisan because the nginx container is linked on the public laraver folder

As for the frontend (Angular) I made sure to expose the 4200, in this way you edit the file locally but links it on the docker instantly and angular cli does the rest on the docker.

So here are the links currently configured:

backend: `localhost:8000`

frontend: `localhost:4200`

phpmyadmin: `localhost:7000`




