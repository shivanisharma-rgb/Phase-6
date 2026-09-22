# Student Feedback Manager

A full-stack learning project for collecting and displaying student feedback with Node.js, Express, MongoDB, and Mongoose.

## Features

- Feedback form with name, 1-5 rating, and comments
- Mongoose schema with validation and timestamps
- `POST /api/feedback` to save a feedback document
- `GET /api/feedback` to retrieve newest feedback first
- Responsive frontend served by Express
- Database connection status and useful empty/error states

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure MongoDB

The backend includes a local `.env` example. For a new machine, copy the template:

```bash
cd backend
cp .env.example .env
```

Use either a local MongoDB URI. This option requires MongoDB to be installed and running on your computer:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/student_feedback
```

If you see `ECONNREFUSED 127.0.0.1:27017`, MongoDB is not running locally. Start the MongoDB service, then restart the app. You can check whether it is listening with:

```bash
ss -ltn 'sport = :27017'
```

If `mongod` is not installed, use MongoDB Atlas instead. Create a free cluster, create a database user, allow your current IP address in Network Access, and copy the Node.js connection string into `backend/.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/student_feedback?retryWrites=true&w=majority
PORT=3000
```

Replace `USERNAME`, `PASSWORD`, and `YOUR-CLUSTER` with your Atlas values. Do not add the real connection string to GitHub or share it publicly.

Or create a free MongoDB Atlas cluster, allow your IP address, create a database user, and put the connection string in `MONGODB_URI`. Replace the password placeholder and URL-encode special characters in the password when necessary.

### 3. Start the server

For development with automatic restart:

```bash
cd backend
npm run dev
```

For production-style startup:

```bash
cd backend
npm start
```

Open <http://localhost:3000> in a browser.

## API

- `GET /api/health` returns server and database status.
- `GET /api/feedback` returns all feedback, newest first.
- `POST /api/feedback` accepts JSON with `name`, `rating`, and `comments`.

Example request:

```json
{
  "name": "Aisha Khan",
  "rating": 5,
  "comments": "The practical examples made the lesson easy to follow."
}
```

## Video demonstration checklist

### Video 1: Setup, schema, and saving data

1. Show `backend/.env` and explain why the MongoDB URI stays out of source control.
2. Show `mongoose.connect()` in `backend/server.js`.
3. Explain the schema in `backend/models/Feedback.js` and the model export.
4. Submit the form and show the `POST /api/feedback` request saving a document.
5. Open MongoDB Compass or Atlas and show the new document.

### Video 2: Retrieving and displaying data

1. Explain the `GET /api/feedback` route in `backend/routes/feedbackRoutes.js` and newest-first sort.
2. Refresh the browser and show feedback loaded from MongoDB.
3. Point out the frontend `fetch()` call and rendered feedback cards.
4. Add another response and show it appear at the top of the list.
5. Briefly demonstrate `/api/health` and the database status indicator.

## Project structure

```text
student-feedback-manager/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── models/Feedback.js
│   └── routes/feedbackRoutes.js
├── frontend/
│   ├── feedback.html
│   ├── feedback.js
│   ├── feedback.css
│   ├── all-feedback.html
│   ├── all-feedback.js
│   └── all-feedback.css
├── .gitignore
└── README.md
```
# Phase-6
