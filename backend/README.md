# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

---

### **Description**

This endpoint allows a new user to register by providing their first name, last name, email, and password. The data is validated before creating the user. On successful registration, a JWT token and user data are returned.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, required, minimum 3 characters
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

---

### **Responses**

#### **Success (200 OK)**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "<hashed_password>",
    "socketId": null,
    "__v": 0
  }
}
```

#### **Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "msg": "Firstname must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
    // ...other errors
  ]
}
```

---

### **Example Request**

```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}'
```

---

### **Status Codes**

- `200 OK` - User registered successfully
- `400 Bad Request` - Validation failed (missing or invalid fields)

---

# User Login Endpoint Documentation

## POST `/users/login`

Authenticates a user and returns a JWT token.

---

### **Description**

This endpoint allows an existing user to log in using their email and password. If the credentials are valid, a JWT token and user data are returned.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**

- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

---

### **Responses**

#### **Success (200 OK)**

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "<hashed_password>",
    "socketId": null,
    "__v": 0
  }
}
```

#### **Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "msg": "invalid Email",
      "param": "email",
      "location": "body"
    }
    // ...other errors
  ]
}
```

#### **Authentication Error (401 Unauthorized)**

```json
{
  "massage": "invalid email or password"
}
```
or
```json
{
  "message": "invali email or password"
}
```

---

### **Example Request**

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}'
```

---

### **Status Codes**

- `200 OK` - Login successful
- `400 Bad Request` - Validation failed (missing or invalid fields)
- `401 Unauthorized` - Invalid email or password

---

# User Profile Endpoint Documentation

## GET `/users/profile`

Returns the authenticated user's profile information.

---

### **Description**

This endpoint returns the profile data of the currently authenticated user. The request must include a valid JWT token (usually sent as a cookie or in the `Authorization` header).

---

### **Headers**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### **Responses**

#### **Success (200 OK)**

```json
{
  "_id": "<user_id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "socketId": null,
  "__v": 0
}
```

#### **Authentication Error (401 Unauthorized)**

```json
{
  "message": "Authentication required"
}
```

---

### **Example Request**

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <jwt_token>"
```

---

### **Status Codes**

- `200 OK` - Profile returned successfully
- `401 Unauthorized` - Authentication required

---

# User Logout Endpoint Documentation

## GET `/users/logout`

Logs out the authenticated user.

---

### **Description**

This endpoint logs out the currently authenticated user by clearing the authentication token cookie. The request must include a valid JWT token (usually sent as a cookie or in the `Authorization` header).

---

### **Headers**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

---

### **Responses**

#### **Success (200 OK)**

```json
{
  "message": "logout successfully"
}
```

#### **Authentication Error (401 Unauthorized)**

```json
{
  "message": "Authentication required"
}
```

---

### **Example Request**

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <jwt_token>"
```

---

### **Status Codes**

- `200 OK` - Logout successful
- `401 Unauthorized` - Authentication required




















# Captain Registration Endpoint Documentation

## POST `/captains/register`

Registers a new captain (driver) in the system.

---

### **Description**

This endpoint allows a new captain to register by providing their name, email, password, and vehicle details. The data is validated before creating the captain. On successful registration, a JWT token and captain data are returned.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Ali",
    "lastname": "Ahmed"
  },
  "email": "ali@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### **Field Requirements**

- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, required, minimum 3 characters
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters
- `vehicle.color`: string, required, minimum 3 characters
- `vehicle.plate`: string, required, minimum 3 characters
- `vehicle.capacity`: integer, required, minimum 1
- `vehicle.vehicleType`: string, required, one of: `car`, `bike`, `auto`

---

### **Responses**

#### **Success (201 Created)**

```json
{
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "Ali",
      "lastname": "Ahmed"
    },
    "email": "ali@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "location": {
      "lat": null,
      "lng": null
    },
    "__v": 0
  },
  "token": "<jwt_token>"
}
```

#### **Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    }
    // ...other errors
  ]
}
```

#### **Duplicate Email (400 Bad Request)**

```json
{
  "message": "captain already exist"
}
```

#### **Server Error (500 Internal Server Error)**

```json
{
  "error": "Error message"
}
```

---

### **Example Request**

```bash
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "Ali", "lastname": "Ahmed" },
  "email": "ali@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

---

### **Status Codes**

- `201 Created` - Captain registered successfully
- `400 Bad Request` - Validation failed or captain already exists
- `500 Internal Server Error` -










## POST `/captains/login`

Login as a captain.

### **Request Body**

```json
{
  "email": "ali@example.com",     // required, string, valid email
  "password": "yourpassword"      // required, string, min 6 chars
}
```

### **Success Response (200 OK)**

```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "Ali",
      "lastname": "Ahmed"
    },
    "email": "ali@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null,
    "location": {
      "lat": null,
      "lng": null
    },
    "__v": 0
  }
}
```

### **Validation Error (400 Bad Request)**

```json
{
  "errors": [
    {
      "msg": "invalid Email", // or other validation messages
      "param": "email",
      "location": "body"
    }
    // ...other errors
  ]
}
```

### **Authentication Error (401/404 Unauthorized/Not Found)**

```json
{
  "message": "invalid email or password"
}
```

### **Server Error (500 Internal Server Error)**

```json
{
  "error": "Error message"
}
```

---

## GET `/captains/profile`

Get the authenticated captain's profile.

### **Headers**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

### **Success Response (200 OK)**

```json
{
  "_id": "<captain_id>",
  "fullname": {
    "firstname": "Ali",
    "lastname": "Ahmed"
  },
  "email": "ali@example.com",
  "status": "inactive",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "socketId": null,
  "location": {
    "lat": null,
    "lng": null
  },
  "__v": 0
}
```

### **Authentication Error (401 Unauthorized)**

```json
{
  "message": "Unauthorized"
}
```

---

## GET `/captains/logout`

Logout the authenticated captain.

### **Headers**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

### **Success Response (200 OK)**

```json
{
  "message": "Logged out successfully"
}
```

### **Authentication Error (401 Unauthorized)**

```json
{
  "message": "Unauthorized"
}
```

### **Server Error (500 Internal Server Error)**

```json
{
  "error": "Error message"
}