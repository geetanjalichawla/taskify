# Taskify Project

## Overview
Taskify is a full-stack application designed to manage tasks effectively. It is built using **React.js** for the frontend and **Node.js with TypeScript** for the backend. The backend uses **PostgreSQL** as the database.

---

## Folder Structure
```
/taskify
  ├── frontend/      # React.js Frontend
  ├── server/        # Node.js Backend with TypeScript
  ├── package.json   # Root Package File with Combined Scripts
  ├── README.md      # Project Documentation
```

---

## Prerequisites
Ensure the following tools are installed:
1. **Node.js** (v16 or later)
2. **npm** (v8 or later)
3. **Docker** and **Docker Compose**

---

## Environment Variables
Create a `.env` file inside the `server` folder with the following content:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskify_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

---

## Docker Setup for PostgreSQL
docker-compose up -d

---

## Installation
### 1. Install Dependencies for Frontend and Backend
```bash
npm run install
npm run install-all
```

---

## Running the Application
### 1. Start Both Frontend and Backend
```bash
npm run start-all
```
This will run the React frontend on **http://localhost:3000** and the Node.js backend on **http://localhost:5000**.

---

## Technologies Used
### Frontend
- **React.js** with Tailwind

### Backend
- **Node.js** with TypeScript
- **Express.js**
- **PostgreSQL**

### Additional Tools
- **Docker** - For PostgreSQL container management.
- **Concurrently** - To run multiple scripts simultaneously.
- **dotenv** - For environment variable management.

---

## API Documentation
The API follows RESTful principles. Use tools like **Postman** or **Thunder Client** to test endpoints.

## API Documentation
The API follows RESTful principles. Use tools like **Postman** or **Thunder Client** to test endpoints.

### Endpoints:

#### Fetch All Tasks
```
GET /tasks
```
![image](https://github.com/user-attachments/assets/52a490df-677b-45a9-9c40-e22241774f74)
![image](https://github.com/user-attachments/assets/66864090-0f8d-4ca5-9580-cf34fe603f22)
![image](https://github.com/user-attachments/assets/d9b0cf69-20d2-40ff-bde7-6ce8b81db275)



Fetches the list of all tasks.

#### Create a Task
```
POST /tasks
```
Creates a new task.

#### Update a Task
```
PUT /tasks/:id
```
![image](https://github.com/user-attachments/assets/b2b2d422-06ff-40ce-b7de-136b01fffe53)

Updates an existing task by ID.

#### Delete a Task
```
DELETE /tasks/:id
```
Deletes a task by ID.



## Scripts
- **Install Dependencies**: `npm run install-all`
- **Start All Services**: `npm run start-all`

---

## Deployment
### Frontend
Build the frontend for production:
```bash
cd frontend
npm run build
```

### Backend
Deploy using **PM2** for process management:
```bash
cd server
npm install pm2 -g
npm run build
pm2 start dist/index.js --name taskify-server
```

---

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Create a pull request.

---

## License
This project is licensed under the **ISC License**.

---

## Contact
- **Developer**: Geetanjali Chawla
- **Email**: geetanjalichawla1919@gmail.com
- **LinkedIn**: [Geetanjali Chawla](https://www.linkedin.com/in/geetanjalichawla)

