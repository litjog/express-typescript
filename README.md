# Express JS application using TypeScript and Webpack

## Get started

Run `npm install`

## Available scripts

### `npm run dev`

Runs the development server\
Open [http://localhost:5000](http://localhost:5000) or [http://localhost:5500](http://localhost:5500) to view it in your browser

### `npm run build`

Builds the app for production to the `build` folder

### `npm start`

Runs app built from `build` folder

## Available routes

### `POST` `http://localhost:5000/api/users`

Add a user\
Request body fields:

| Field      | Data type | Required |
| ---------- | --------- | -------- |
| `name`     | `string`  | `true`   |
| `username` | `string`  | `true`   |
| `age`      | `number`  | `true`   |

Example request:

```javascript
async function postUser() {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Your Name',
        username: 'your_username',
        age: 20,
      }),
    });

    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
```

### `GET` `http://localhost:5000/api/users`

Get all users

Example request:

```javascript
async function getUsers() {
  try {
    const response = await fetch('http://localhost:5000/api/users');
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
```

### `GET` `http://localhost:5000/api/users/:id`

Get a user by id

Example request:

```javascript
async function getUser() {
  try {
    const response = await fetch('http://localhost:5000/api/users/1');
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
```

### `PUT` `http://localhost:5000/api/users/:id`

Update a user by id\
Request body fields:

| Field      | Data type | Required |
| ---------- | --------- | -------- |
| `name`     | `string`  | `true`   |
| `username` | `string`  | `true`   |
| `age`      | `number`  | `true`   |

Example request:

```javascript
async function updateUser() {
  try {
    const response = await fetch('http://localhost:5000/api/users/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Name',
        username: 'new_username',
        age: 21,
      }),
    });

    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
```

### `DELETE` `http://localhost:5000/api/users/:id`

Delete a user by id

Example request:

```javascript
async function deleteUser() {
  try {
    const response = await fetch('http://localhost:5000/api/users/1', {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
```
