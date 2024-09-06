# API Documentation

## Auth Routes

### `GET /auth`
- **Description**: Retrieves an authentication code.
- **Query Parameters**:
  - `email` (string): The email address to send the authentication code to.
- **Example Request**:
  ```
  GET /auth?email=johndoe@example.com
  ```

### `POST /auth`
- **Description**: Verifies the authentication code sent to the user's email.
- **Request Body**:
  ```json
  {
    "email": "joshua.brionne@gmail.com",
    "code": "dmopeq9"
  }
  ```
- **Example Request**:
  ```bash
  POST /auth
  Content-Type: application/json
  
  {
    "email": "joshua.brionne@gmail.com",
    "code": "dmopeq9"
  }
  ```

---

## Gambling Routes

### `POST /`
- **Description**: Creates a new gambling session.
- **Middleware**: `authMiddleware`
- **Request Body**:
  ```json
  {
    "choices": ["test", "test2"],
    "title": "uwu",
    "imageUrl": "qweqwe",
    "multiChoices": "true"
  }
  ```
- **Example Request**:
  ```bash
  POST /
  Content-Type: application/json
  
  {
    "choices": ["test", "test2"],
    "title": "uwu",
    "imageUrl": "qweqwe",
    "multiChoices": "true"
  }
  ```

### `POST /:gamblingId/vote`
- **Description**: Votes on a specific gambling session.
- **Middleware**: `authMiddleware`
- **Path Parameters**:
  - `gamblingId` (string): The ID of the gambling session.
- **Request Body**:
  ```json
  {
    "choice": [1, 2],
    "gamble": "5"
  }
  ```
- **Example Request**:
  ```bash
  POST /:gamblingId/vote
  Content-Type: application/json
  
  {
    "choice": [1, 2],
    "gamble": "5"
  }
  ```

### `GET /:gamblingId`
- **Description**: Retrieves details of a specific gambling session.
- **Path Parameters**:
  - `gamblingId` (string): The ID of the gambling session.
- **Example Request**:
  ```bash
  GET /:gamblingId
  ```

### `GET /`
- **Description**: Retrieves a list of all gambling sessions.
- **Example Request**:
  ```bash
  GET /
  ```

### `PUT /:gamblingId/close`
- **Description**: Closes a specific gambling session.
- **Middleware**: `authMiddleware`
- **Path Parameters**:
  - `gamblingId` (string): The ID of the gambling session.
- **Example Request**:
  ```bash
  PUT /:gamblingId/close
  ```