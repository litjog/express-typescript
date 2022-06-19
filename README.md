# Express JS application using TypeScript and Webpack

## Get started

run `npm install`

## Available scripts

`npm run dev`

Runs the development server.\
Open [http://localhost:5000](http://localhost:5000) or [http://localhost:5500](http://localhost:5500) to view it in your browser.

`npm run build`

Builds the app for production to the `build` folder.

`npm start`

Runs app built from `build` folder.

## Available routes

`POST http://localhost:5000/api/users`

Add a user to the application\
Required fields:

| Field      | Data type | Required |
| ---------- | --------- | -------- |
| `name`     | `string`  | `true`   |
| `username` | `string`  | `true`   |
| `age`      | `number`  | `true`   |

`GET http://localhost:5000/api/users`

Get all users

`GET http://localhost:5000/api/users/:id`

Get a user by id.

`PUT http://localhost:5000/api/users/:id`

Update a user by id.\
Required fields:

| Field      | Data type | Required |
| ---------- | --------- | -------- |
| `name`     | `string`  | `true`   |
| `username` | `string`  | `true`   |
| `age`      | `number`  | `true`   |

`DELETE http://localhost:5000/api/users/:id`

Delete a user by id.
