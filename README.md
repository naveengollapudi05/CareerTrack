# CareerTrack — Smart Career & Internship Management System

CareerTrack is a web-based platform designed to help students organize job and internship applications, track application progress, and manage their career preparation in one place.

## ✨ Features

- **Application Tracker:** Save company names, job roles, application links, and statuses.
- **Dashboard:** View application statistics and track progress.
- **Application Management:** Add, view, and delete job applications.
- **Database Integration:** Store and retrieve application data using MongoDB Atlas.
- **Responsive Interface:** A React-based interface for managing career opportunities.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Version Control:** Git and GitHub

## 📁 Project Structure

```text
CareerTrack/
├── client/                  # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── server/                  # Express backend
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   └── applicationRoutes.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or another MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/naveengollapudi05/CareerTrack.git
cd CareerTrack
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string
```

Add your own MongoDB connection string. Never commit `.env` or expose database credentials.

Start the backend:

```bash
node server.js
```

The backend runs on `http://localhost:5000` by default.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Retrieve applications |
| POST | `/api/applications` | Add an application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

## 🎯 Project Objective

The objective of CareerTrack is to simplify the job and internship search process by providing students with a central place to organize opportunities and monitor application progress.

## 🔮 Future Enhancements

- Edit application details and statuses from the dashboard
- Search, filter, and sort applications
- Skill gap analysis using job descriptions
- Resume builder and resource tracking
- User authentication and personalized dashboards

## 👨‍💻 Author

**Naveen Gollapudi**

GitHub: [@naveengollapudi05](https://github.com/naveengollapudi05)

---

*CareerTrack — Plan smarter. Prepare better. Move forward.*
