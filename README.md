# 🚀 Employee Management System

A Full Stack Employee Management System built using **Spring Boot, React, TypeScript, PostgreSQL, JWT Authentication, Docker, and Swagger**.

The application provides secure user authentication, employee management, dashboard analytics, employee photo upload, PDF/Excel export, and Dockerized deployment.

---

# 📌 Features

## Authentication

- JWT Authentication
- User Registration
- User Login
- Role-Based Authorization (ADMIN / USER)
- BCrypt Password Encryption

---

## Dashboard

- Total Employees
- Total Departments
- Total Admins
- Total Users
- Department-wise Pie Chart

---

## Employee Management

- Add Employee
- Update Employee
- Delete Employee
- View Employee
- Search by Name
- Search by Department
- Pagination
- Sorting

---

## Employee Photo

- Upload Employee Photo
- Update Photo
- Display Employee Avatar

---

## Reports

- Export Employees to Excel
- Export Employees to PDF

---

## API Documentation

- Swagger UI
- OpenAPI Documentation

---

## DevOps

- Docker
- Docker Compose
- PostgreSQL Container

---

# 🛠 Technology Stack

## Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

## Frontend

- React
- TypeScript
- Bootstrap
- Axios
- React Router
- React Toastify
- Recharts

## Database

- PostgreSQL

## DevOps

- Docker
- Docker Compose

## Documentation

- Swagger
- Spring Boot Actuator

---

# 🏗 System Architecture

```
React + TypeScript
        │
        │ REST API
        ▼
Spring Boot + JWT Security
        │
        ▼
Spring Data JPA
        │
        ▼
PostgreSQL
```

---

# 📂 Project Structure

```
EmployeeManagement/

│

├── backend/

│   ├── controller/

│   ├── service/

│   ├── repository/

│   ├── entity/

│   ├── dto/

│   ├── security/

│   ├── config/

│   └── resources/

│

├── frontend/

│   ├── components/

│   ├── pages/

│   ├── services/

│   ├── api/

│   ├── types/

│   └── assets/

│

├── Dockerfile

├── docker-compose.yml

└── README.md
```

---

# 🔐 Authentication Flow

```
User Login

↓

Spring Security

↓

JWT Token

↓

Frontend Stores Token

↓

Authorization Header

↓

Protected REST APIs
```

---

# 📊 Dashboard

Dashboard provides

- Total Employees

- Total Departments

- Total Users

- Total Admins

- Pie Chart

---

# 📷 Employee Photo Upload

Supports

- Upload Employee Image

- Update Employee Image

- Preview Employee Image

---

# 📑 REST APIs

## Authentication

```
POST /auth/register

POST /auth/login
```

## Dashboard

```
GET /dashboard

GET /dashboard/chart
```

## Employee

```
GET /employees

GET /employees/{id}

POST /employees

PUT /employees/{id}

DELETE /employees/{id}
```

## Search

```
GET /employees/search

GET /employees/search/department
```

---

# 🐳 Docker

## Build

```bash
docker compose build
```

## Run

```bash
docker compose up
```

## Stop

```bash
docker compose down
```

---

# ⚙ Installation

## Backend

```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git

cd backend

mvn clean install

mvn spring-boot:run
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📚 Swagger

```
http://localhost:8080/swagger-ui/index.html
```

---

# ❤️ Health Check

```
http://localhost:8080/actuator/health
```

---

# 📸 Screenshots

## Login

(Add Screenshot)

---

## Register

(Add Screenshot)

---

## Dashboard

(Add Screenshot)

---

## Employee List

(Add Screenshot)

---

## Add Employee

(Add Screenshot)

---

## Swagger

(Add Screenshot)

---

# ✅ Testing

- Unit Testing
- Manual Testing
- Swagger Testing
- CRUD Testing
- Docker Testing

---

# 🚀 Future Enhancements

- Email Notification

- Attendance Module

- Payroll Module

- Leave Management

- Redis Cache

- CI/CD Pipeline

- Kubernetes Deployment

- Mobile Application

---

# 👨‍💻 Author

**Sravan Kumar**

GitHub:
https://github.com/Sravan7721

LinkedIn:
(Add Your LinkedIn)

Email:
(Add Your Email)

---

# ⭐ If you like this project

Please give it a ⭐ on GitHub.
