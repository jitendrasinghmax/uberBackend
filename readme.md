# API Documentation

## Endpoint: `/user/register`

### Description
This endpoint is used to register a new user. It validates the user input, hashes the password, stores the user in the database, and returns a JWT token upon successful registration.

### Method
`POST`

### Request Body
The request body must be a JSON object with the following structure:

```json
{
  "firstName": "string (min 3 characters)",
  "lastName": "string (min 3 characters)",
  "email": "string (valid email format, min 5 characters)",
  "password": "string (min 6 characters)"
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "string (JWT token)"
}
```

#### Error (400 Bad Request)
If the input validation fails, the response will contain an array of errors:
```json
{
  "error": [
    {
      "field": "string (field name, e.g., 'fullName.firstName')",
      "message": "string (error message)"
    }
  ]
}
```

### Status Codes
- `201`: User successfully registered.
- `400`: Validation error in the input data.
- `500`: Internal server error (e.g., database issues).

### Example Request
```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}'
```

### Example Response (Success)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example Response (Validation Error)
```json
{
  "error": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## User Routes

### POST `/user/login`

**Description**: Logs in a user by validating their email and password.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Responses**:
- **200 OK**: Returns a JSON object containing the authentication token.
  ```json
  {
    "token": "your-jwt-token"
  }
  ```
- **401 Unauthorized**: Invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
- **400 Bad Request**: Validation errors in the input.
  ```json
  {
    "error": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
  ```

**Middleware**:
- `userValidation.login`: Validates the request body.
- `userController.loginUser`: Handles the login logic.

---

### POST `/user/profile`

**Description**: Retrieves the profile of the authenticated user.

**Headers**:
- `Authorization`: Bearer token (JWT).

**Responses**:
- **200 OK**: Returns the user profile.
  ```json
  {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
  ```
- **401 Unauthorized**: If the user is not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Middleware**:
- `authUser.authUser`: Validates the JWT token.
- `userController.userProfile`: Handles the profile retrieval logic.

---

### POST `/user/logout`

**Description**: Logs out the authenticated user by clearing the token and blacklisting it.

**Headers**:
- `Authorization`: Bearer token (JWT).

**Responses**:
- **200 OK**: Confirms successful logout.
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **401 Unauthorized**: If the user is not authenticated.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Middleware**:
- `authUser.authUser`: Validates the JWT token.
- `userController.logoutUser`: Handles the logout logic.
