**Role-Based Ticketing System**
A full-stack web application for creating and managing support tickets with role-based access control. Built with React.js (frontend), Node.js (backend), and MongoDB (database).

  **Features**
User Authentication:
- JWT-based login and signup.
- Role-based access control (User and Admin roles).

**User Features:**
- Create support tickets with a title and description.
- View a list of their own tickets.

**Admin Features:**
- View all tickets created by users.
- Update ticket status (Open, In Progress, Closed).

**Frontend:**
- Built with React.js (Class Components).
- State management using React Context API.

**Backend**:
- Built with Node.js and Express.js.
- MongoDB for database storage.
- RESTful API for ticket management.

     **Technologies Used**
**Frontend**
- React.js
- React Router for navigation.
- Axios for API requests.

**Backend**
- Node.js
- Express.js for REST API.
- MongoDB for database.
- Mongoose for MongoDB object modeling.
- JSON Web Token (JWT) for authentication.

    **Installation**
**Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

**Steps**
Clone the repository:

bash
git clone https://github.com/yeabtsee/ticketing-system-mini-project.git
cd ticketing-system-mini-project
Set up the backend:

Navigate to the backend folder:
bash
cd backend
Install dependencies:
bash
npm install
Create a .env file in the backend folder and add the following:
env
MONGO_URI=mongodb://localhost:27017/ticket-system
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:
bash
npm start
Set up the frontend:

Navigate to the frontend folder:
bash
cd ../frontend
Install dependencies:
bash
npm install
Start the frontend development server:
bash
npm start
Access the application:

Open your browser and go to http://localhost:3000.
Folder Structure
Code
role-based-ticketing-system/
├── backend/
│   ├── config/               # Database configuration
│   ├── middleware/           # Authentication middleware
│   ├── models/               # MongoDB models (User, Ticket)
│   ├── routes/               # API routes (auth, tickets)
│   ├── .env                  # Environment variables
│   ├── server.js             # Backend entry point
│   └── package.json          # Backend dependencies
│
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React Context API
│   │   ├── Assets/           # CSS and other assets
│   │   ├── App.js            # Main React component
│   │   └── index.js          # Frontend entry point
│   └── package.json          # Frontend dependencies
│
└── README.md                 # Project documentation

API Endpoints
Authentication
POST /api/signup: Register a new user.
JSON
{
  "username": "testuser",
  "email": testuser@gmail.com
  "password": "password123",
  "role": "user"
}
POST /api/login: Authenticate a user and return a JWT token.
JSON
{
  "username": "testuser",
  "password": "password123"
}
Tickets
POST /api/tickets: Create a new ticket (User only).
JSON
{
  "title": "Test Ticket",
  "description": "This is a test ticket."
}
GET /api/tickets: Fetch tickets.
Users: Fetch their own tickets.
Admins: Fetch all tickets.
PUT /api/tickets/:id: Update ticket status (Admin only).
JSON
{
  "status": "In Progress"
}

**Screenshots**
Signup Page
![image](https://github.com/user-attachments/assets/b48017a9-94af-4e9e-8b02-ed21f76899aa)

**Login Page**
![image](https://github.com/user-attachments/assets/a9539c26-4c2d-4fe9-810c-04c018db0d31)


**User Dashboard**
![image](https://github.com/user-attachments/assets/e32453b0-0f0b-4d6a-b96c-25a02f7fdf97)


**Admin Dashboard**
![image](https://github.com/user-attachments/assets/bc6c2cbc-f41f-462c-9582-c594b786ada6)



**Contact**
For questions or feedback, feel free to reach out:

Yeabtsega Tesfaye
Email: yeabtesfayetesfaye519@gmail.com
GitHub: github.com/Yeabtsee
