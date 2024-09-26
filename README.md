* cd into project && yarn install to install all dependencies
* create an env file and fill in these varible names
 DATABASE_HOST = ""
 DATABASE_PORT =
 DATABASE_USERNAME = ""
 DATABASE_PASSWORD = ""
 DATABASE_NAME = ""
JWT_SECRET=
JWT_EXPIRATION=

* run the command yarn run build so you can deploy the table to the db
* run the migration to create db and deploy the table to the db
 with command  "npm run migration:run"
* run yarn run start:dev in dev environment
* got to your browser and enter the uri 'http://localhost:3000/api-docs' 