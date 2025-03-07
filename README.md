# Secret Santa Game

## Overview
Secret Santa is a game where employees are randomly assigned to anonymously gift each other.  
This project **automates the Secret Santa assignment process** using **MERN stack**.

## Features
- **Upload CSV Files** – Add employee data from a file.  
- **Randomized Assignments** – Ensure no one gets themselves or last year's match.  
- **Download Assignments** – Export the Secret Santa results as CSV.  
- **Modern UI** – Built with **React & Material UI**.    
- **MERN Stack**: MongoDB, Express.js, React.js, Node.js.  


---

## **Tech Stack**
| **Category** | **Technology** |
|-------------|---------------|
| **Frontend** | React.js, Material UI, React Router |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **File Handling** | Multer (uploads), json2csv (exports) |
| **Testing** | Jest, Supertest |


---

---

## **API Endpoints**
| **Method** | **Endpoint** | | **Description** |
|-------------|---------------|-------------------------------------------|
| **POST** | /v1/secret-santa/assign | Upload employees CSV |
| **GET** | /v1/secret-santa/assignments | Get Secret Santa assignments |
| **GET** | /v1/secret-santa/download | Download assignments CSV |

---

## **Installation**
### ** Clone the Repository**

```bash

git clone https://github.com/algotedharmateja/secret-santa-game.git
cd secret-santa-game


## **Frontend Setup**
### **Install Frontend Dependenciesy**

cd frontend

npm install

npm run dev


## **Backend Setup**
### **Install Backend Dependencies**

cd backend

npm install

npm start

## **Configure Environment Variables**
### **Create a .env file inside the backend/ directory:**

PORT=8082



## **Project Folder Structure**

secret-santa-game/
│── backend/        # Backend (Node.js, Express)
│   │── data
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── output/
│   │   ├── services/
│   │   ├── app.js/
│   │   ├── index.js/  # Backend entry point
│   │── test
│   │── .env        # Environment variables
│   │── package.json
│     
│
│── frontend/       # Frontend (React, Material UI)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │── package.json
│
│── README.md       # Project Documentation
│── .gitignore      # Ignored files (node_modules, .env)

