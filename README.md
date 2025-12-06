# ToDo List – Fullstack using Next.js 14 and MongoDB

A full-featured web application for managing tasks with storage in a database.

## Features

- Add tasks
- Mark as completed
- Delete tasks
- Store tasks in MongoDB

## Technologies

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose

## Startup

### 1. Clone the repository

```bash
git clone https://github.com/Vlad-Mirzoian/ToDoNextJSApp.git
cd ToDoNextJSApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configuring environment variables

Copy the .env example and fill in your data.
For Linux/macOS:

```bash
cp .env.example .env
```

For Windows (cmd):

```bash
copy .env.example .env
```

Open .env and specify the connection string to MongoDB:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

If you have a local MongoDB, you can use:

```bash
mongodb://localhost:27017/todo-app
```

### 4. Run the application

```bash
npm run dev
```

Open: http://localhost:3000
