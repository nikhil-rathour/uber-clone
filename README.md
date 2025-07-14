# Uber Clone 🚗

A full-stack Uber Clone application that simulates ride-hailing features with separate frontend (React) and backend (Node.js/Express) directories.



## Features ✨

- **User Authentication**: Login/signup with JWT
- **Real-time Ride System**: Ride requests and driver matching
- **Live Map Tracking**: Google Maps integration
- **Ride History**: Trip records and receipts
- **Dual Profiles**: Driver and rider interfaces
- **Payment Integration**: Simulated payment processing

## Tech Stack 🛠️

### Frontend
- React
- JavaScript/TypeScript
- CSS/SCSS (Tailwind)
- Google Maps API
- Socket.io Client

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- WebSockets (Socket.io)
- JWT Authentication




## Folder Structure
```
uber-clone/
├── frontend/                # Frontend application (e.g., React)
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components/views
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json         # Frontend dependencies and scripts
│   └── ...                  # Other config files
│
├── backend/                 # Backend application (e.g., Node.js/Express)
│   ├── src/                 # Source code
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models/schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Entry point
│   ├── package.json         # Backend dependencies and scripts
│   └── ...                  # Other config files
│
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
└── ...                      # Other root-level files (e.g., LICENSE)
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


