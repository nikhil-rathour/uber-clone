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