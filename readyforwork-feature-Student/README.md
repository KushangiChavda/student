# Ready for work microservices architecture

API for 'Ready For Work' project.

# Getting Started

Clone this repository, and follow the documentation to start Ready for work.

## Folder structure

    .
    ├── auth-service            # Auth service container.
    │   ├── src                 # Src folder of auth service.
    │   |   ├── controllers     # All controllers of auth service with test integrated.
    │   │   ├── routes          # Auth service routes declaration.
    │   │   ├── utils           # Helper functions for auth service
    │   │   ├── index.js        # Exporting new NodeInstance with service related configuration.
    │   │   └── User.js         # User Schema/Model for mongoose.
    │   ├── .env.example        # Create .env file based on this.
    │   ├── server.js           # server main file for auth-service.
    │   └── ...                 # other files which are not required any changes.
    ├── core                    # Core code which is used to create server in all services.
    ├── example-service         # Example service container
    │   ├── src                 # Src folder of example service.
    │   |   ├── controllers     # All controllers of example service.
    │   │   ├── routes          # Example service routes declaration.
    │   │   ├── utils           # Helper functions example service.
    │   │   └── index.js        # Exporting all routes from src.
    │   ├── .env.example        # Create .env file based on this.
    │   ├── server.js           # Server main file for example-service.
    │   └── ...                 # Other files which are not required any changes.
    ├── UI                      # Client server container.
    │   ├── public              # Public folder where all client files stored.
    │   │   └── ...             # All public files(CDNs).
    │   ├── src                 # Src folder for Client server.
    │   │   └── app.js          # Exporting server main code.
    │   ├── server.js           # server main file.
    │   └── ...                 # Other files which are not required any changes.
    └── ...                     # Other files which are not required any changes.

## Environment variables

| Name                  | Description                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| REACTION_LOGGER_NAME  | Is used to display service name while debug option true while create new NodeInstance.                  |
| PORT                  | PORT is used to start server on given value.                                                            |
| ROOT_URL              | ROOT_URL is used for particular service to display API link, i.e. http://localhost:4000                 |
| MONGO_URL             | Database connection URL for mongoose connection.                                                        |
| API_PREFIX            | All defined routes for particular service is added after this route path, i.e. /api/v1                  |

## Make sure that following dependencies are installed in your machine.

1. NodeJS 
```sh
node --version
```
2. npm (which is automatically installed if NodeJS is installed)
```sh 
npm --version
```
3. MongoDB
```sh 
mongod --version
# Or
mongo -version

# Note: If you are using Windows and any of listed above command didn't worked if you have not set MongoDB Path.
```

## Get started all services separately (installation included).

Note:
- Run all following commands from project's root directory.

Installation: 

```bash
# NOTE: Run this commands form root directory
npm install

npm run app-install
```

`CTRL+C` to interrupt the installation.

Run:

```bash
# NOTE: Run this commands form root directory
# 1st terminal
npm start

# OR - Run following commands for start particular services or project 

# 1st terminal
# Starts only auth service
npm run auth

# 2nd terminal
# Starts only UI
npm run UI

# 3rd terminal
# Starts only admin UI
npm run admin-UI
```

Note: we don't need to start common

`CTRL+C` to stop.

## Short commands to get started
NOTE: Run following commands under root directory.

| Name                     | Project      | Description                                                  |
| ---------------------    | ---------    | ------------------------------------------------------------ |
| npm install              | Global       | Used to install concurrently in root path.                   |
| npm run app-install      | Global       | Used to install dependencies in all services include core.   |
| npm run core-install     | Global       | Used to install only core related dependencies.              |
| npm run admin-UI-install | Admin UI     | Used to install only admin related dependencies.             |
| npm run auth-install     | Auth service | Used to install only auth services related dependencies.     |
| npm run UI-install       | UI           | Used to install only UI related dependencies.                |
| npm run seed:auth        | Auth service | Used to used to seed data for the auth-service.              |
| npm start                | Global       | Used to start all services together.                         |
| npm run auth             | Auth service | Used to start only auth service.                             |
| npm run UI               | UI           | Used to start only UI.                                       |
| npm run admin-UI         | Admin UI     | Used to start only admin.                                    |

# API Endpoints

## Auth-Service: 

### GET

1. `/auth/v1/signUp` - Testing route development purpose.

Response: 
```
    server running
```

### POST

1. `/auth/v1/signUp` - Register new user.

Model: 
```js
{
    "name" : "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
}
```

2. `/auth/v1/login` - Login existing user.

Model:
```js
{
    "email": "string",
    "password": "string"
}
```

## Example-Service:  

### GET

1. `/example/v1/example` - Testing route development purpose.

Response: 
```
    server running
```

2. `/example/v1/isAuth` - Check user is logged in need to pass login token.

header:
```js
// Need to passs authtoken key with token value
authtoken: "token without quotes"
```

Response: 
```js
// Based on login status.
{ message: "Authorized" }
// or
{ message: "Unauthorized" }
```
