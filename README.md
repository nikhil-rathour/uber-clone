# Uber Clone

A full-stack Uber Clone application that simulates ride-hailing features similar to the original Uber app. This project is structured with separate frontend and backend directories for modular development.

## Features
- User authentication (login/signup)
- Real-time ride requests and driver matching
- Live map tracking
- Ride history and receipts
- Driver and rider profiles
- Payment integration (simulated)

## Tech Stack
- **Frontend:** React, JavaScript/TypeScript, CSS/SCSS, Map APIs (e.g., Google Maps)
- **Backend:** Node.js, Express, MongoDB/PostgreSQL, WebSockets
- **Other:** JWT for authentication, RESTful APIs, Socket.io for real-time communication

## Folder Structure
```
uber-clone/
├── frontend/   # Frontend React application
├── backend/    # Backend API and services
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB/PostgreSQL (for backend)

### Installation
1. **Clone the repository:**
  
2. **Install dependencies:**
   - Frontend:
     ```bash
     cd frontend
     npm install
     # or yarn install
     ```
   - Backend:
     ```bash
     cd ../backend
     npm install
     # or yarn install
     ```
3. **Configure environment variables:**
   - Create `.env` files in both `frontend` and `backend` as needed.

4. **Run the applications:**
   - Backend:
     ```bash
     npm start
     ```
   - Frontend (in a new terminal):
     ```bash
     npm start
     ```

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.


