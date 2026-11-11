# Student Management System (CRUD)

A simple and responsive Student Management System built with **Next.js, TypeScript, Tailwind CSS, MongoDB, and Mongoose**. This application allows users to manage student records through Create, Read, Update, and Delete (CRUD) operations.

## 🚀 Features

- **Add Student:** Create a new student record with name, email, phone number, and department.
- **View Students:** Display all registered students in a structured table.
- **View Student Details:** Retrieve an individual student's information using their ID.
- **Update Student:** Edit existing student information.
- **Delete Student:** Remove student records with a confirmation prompt.
- **Form Validation:** Ensure all required fields are provided.
- **Responsive Design:** User-friendly interface for different screen sizes.
- **MongoDB Integration:** Store and manage student data using MongoDB and Mongoose.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and API routes |
| React.js | Building the user interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Lucide React | Icons |

## 📁 Project Structure

```text
student-management-system/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── students/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   │
│   │   ├── components/
│   │   │   ├── StudentForm.tsx
│   │   │   └── StudentTable.tsx
│   │   │
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── lib/
│   │   └── mongodb.ts
│   │
│   └── models/
│       └── Student.ts
│
├── public/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd student-management-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Required Packages

```bash
npm install mongoose lucide-react
```

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.

**Note:** Never commit your `.env.local` file or expose your database credentials publicly.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🔗 API Documentation

The application uses Next.js API routes to perform CRUD operations.

### Base URL

```text
/api/students
```

### Available API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| POST | `/api/students` | Create a new student |
| GET | `/api/students/:id` | Retrieve a student by ID |
| PUT | `/api/students/:id` | Update a student by ID |
| DELETE | `/api/students/:id` | Delete a student by ID |

### Student Data Structure

Each student record contains the following fields:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01234567890",
  "department": "Computer Science"
}
```

### Example API Requests

**Create a Student**

```http
POST /api/students
Content-Type: application/json
```

**Update a Student**

```http
PUT /api/students/your_student_id
Content-Type: application/json
```

**Delete a Student**

```http
DELETE /api/students/your_student_id
```

## 🗄️ Database

This project uses MongoDB as its database and Mongoose as the Object Data Modeling (ODM) library.

The `Student` model includes:

- `name` – Student's full name.
- `email` – Student's email address (unique).
- `phone` – Student's phone number.
- `department` – Student's academic department.
- `timestamps` – Automatically stores creation and update dates.

## 🎯 Project Objective

The main objective of this project is to understand and implement CRUD operations using Next.js API routes and MongoDB. It demonstrates how frontend components communicate with backend APIs and how data is stored, retrieved, updated, and deleted from a database.

## 👨‍💻 Author

**Sudipto Roy**

Full Stack MERN Developer

---

⭐ If you find this project useful, consider giving it a star!