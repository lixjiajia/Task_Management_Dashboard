# Task Management Dashboard

A modern web application for managing employee tasks with role-based access control. Built with React frontend and Flask GraphQL backend.

## Features

### Admin Dashboard
- Create and manage employee accounts
- Assign tasks to employees with details (title, description, date, category)
- View all tasks across employees
- Monitor task statuses (New, Active, In Review, Completed)

### Employee Dashboard
- View assigned tasks
- Accept new tasks (move to Active)
- Mark tasks as completed or send for review
- Track task progress

### Authentication
- Secure login system
- Role-based access (Admin/Employee)
- Persistent sessions with localStorage

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation (if implemented)

### Backend
- **Flask** - Python web framework
- **Graphene** - GraphQL library for Python
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database (file-based)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python3 app.py
   ```
   The server will run on `http://localhost:5001` with GraphQL endpoint at `/graphql`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd src
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Usage

### Login Credentials
- **Admin**: `admin@me.com` / `123`
- **Employee**: Use credentials from database (created by admin)

### GraphQL API
Visit `http://localhost:5001/graphql` to explore the API with GraphiQL interface.
The backend provides a GraphQL API with the following main operations:
#### Queries
- `employees`: Get all employees with their tasks
- `employee(id: Int!)`: Get specific employee by ID
- `tasks`: Get all tasks

#### Mutations
- `createEmployee(firstName: String!, email: String!, password: String!)`: Create new employee
- `deleteEmployee(id: Int!)`: Delete employee
- `createTask(employeeId: Int!, taskTitle: String!, taskDescription: String, taskDate: Date, category: String)`: Create task for employee
- `updateTaskStatus(taskId: Int!, status: String!)`: Update task status ('accept', 'complete', 'review')

### Database
- Uses SQLite database (`db.sqlite3`)
- Tables: `employees`, `tasks`
- Database is automatically created/updated on server start
