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





## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization:

 Bear

er <token>`

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```