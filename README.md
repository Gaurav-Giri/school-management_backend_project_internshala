# School Management API
live at 

[school-managementbackendprojectinternshala-production.up.railway.app](https://school-managementbackendprojectinternshala-production.up.railway.app/)

A production-ready RESTful API built with Node.js, Express.js, and MySQL for managing school records and calculating distances.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Validation:** express-validator
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Environment:** dotenv

## 📁 Project Structure

```text
backend_project_internshala_2/
│
├── config/
│   └── db.js               # Database connection pool
│
├── controllers/
│   └── schoolController.js  # API logic
│
├── middleware/
│   └── validation.js       # Input validation logic
│
├── routes/
│   └── schoolRoutes.js     # API endpoints
│
├── utils/
│   └── distanceCalculator.js # Haversine formula
│
├── postman/
│   └── School-Management-API.postman_collection.json
│
├── .env                    # Environment variables
├── .env.example            # Example env template
├── .gitignore              # Files to ignore in Git
├── package.json            # Dependencies and scripts
├── README.md               # Documentation
└── server.js               # Entry point
```

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd backend_project_internshala_2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup
Create a MySQL database named `school_management` and run the following SQL:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Environment Variables
Create a `.env` file in the root directory (or copy `.env.example`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📡 API Documentation

### 1. Add School
- **Endpoint:** `POST /addSchool`
- **Body:**
  ```json
  {
    "name": "ABC School",
    "address": "Kolkata",
    "latitude": 22.5726,
    "longitude": 88.3639
  }
  ```
- **Description:** Adds a new school to the database.

### 2. List Schools
- **Endpoint:** `GET /listSchools?latitude=22.57&longitude=88.36`
- **Description:** Returns a list of all schools sorted by proximity to the provided coordinates.

### 3. Health Check
- **Endpoint:** `GET /`
- **Response:** `{ "message": "School Management API Running" }`

## 🧪 Testing with Postman
Import the collection from `postman/School-Management-API.postman_collection.json` into your Postman application.

## 📄 License
ISC
