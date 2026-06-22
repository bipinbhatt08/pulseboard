# PulseBoard

A full-stack real-time polling platform. Create polls, add questions and options, collect votes from authenticated or anonymous users, and watch results update live via WebSockets.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TanStack Router, React Hook Form, Socket.IO Client |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT (access + refresh tokens), bcrypt, email verification |
| Real-time | Socket.IO |
| Validation | Joi |
| Email | Brevo (HTTP API) |

---

## Features

- JWT authentication with access/refresh token rotation
- Email verification on registration and password reset with expiry
- Create polls with configurable duration (minutes / hours / days)
- Add questions and options to polls
- Publish polls when ready
- Vote as authenticated user or anonymously (per poll setting)
- Duplicate vote prevention via unique DB index + atomic transactions
- Real-time vote count updates pushed to all clients in a poll room
- Poll analytics — per-question breakdown with vote percentages
- Pagination and filtering on poll listings (active, expired, published, anonymous, authenticated)

---

## Project Structure

```
pulseBoard/
├── backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── common/
│       │   ├── config/         # DB, email, socket setup
│       │   ├── middleware/     # error handler, request validation
│       │   └── utils/          # ApiError, ApiResponse, JWT helpers
│       └── modules/
│           ├── auth/           # register, login, logout, verify, reset
│           ├── poll/           # CRUD, publish, analytics
│           ├── question/       # add questions to polls
│           ├── option/         # add options to questions
│           └── vote/           # cast votes, results
└── frontend/
    └── src/
        ├── services/           # axios API clients, socket service
        └── utils/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pulseboard
CLIENT_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=you@example.com
BREVO_SENDER_NAME=PulseBoard
```

```bash
npm run dev      # development (nodemon)
npm start        # production
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | — | Register and receive verification email |
| GET | `/auth/verify-email/:token` | — | Verify email address |
| POST | `/auth/login` | — | Login, returns access + refresh tokens |
| POST | `/auth/logout` | Required | Invalidate refresh token |
| POST | `/auth/refresh` | — | Rotate refresh token |
| GET | `/auth/me` | Required | Get current user |
| POST | `/auth/forgot-password` | — | Send password reset email |
| PUT | `/auth/reset-password/:token` | — | Reset password |

### Polls

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/polls` | — | List all polls (supports `filter`, `offset`, `limit`) |
| POST | `/polls` | Required | Create a poll |
| GET | `/polls/my-polls` | Required | Get current user's polls |
| GET | `/polls/:pollId` | — | Get poll with questions and options |
| PATCH | `/polls/:pollId/publish` | Required | Publish a poll |
| GET | `/polls/:pollId/analytics` | Optional | Get vote analytics for a poll |

### Questions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/questions` | Required | Add a question to a poll |
| GET | `/questions/:id` | — | Get a question by ID |
| GET | `/questions/poll/:pollid` | — | Get all questions for a poll |

### Options

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/options` | Required | Add an option to a question |
| GET | `/options/questions/:questionId` | — | Get all options for a question |
| GET | `/options/:optionId` | — | Get an option by ID |

### Votes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/votes` | Optional | Cast a vote (authenticated or anonymous) |
| GET | `/votes/polls/:pollId` | Required | Get all votes for a poll |

---

## Real-time Events

The backend emits Socket.IO events so connected clients see live vote updates without polling.

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join:poll` | Client → Server | `pollId` | Join a poll's room |
| `vote:new` | Server → Client | `{ pollId, questionId, optionId }` | Fired after every successful vote |

```js
// Client-side example
socket.emit('join:poll', pollId)
socket.on('vote:new', ({ optionId }) => {
  // increment count on UI
})
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `CLIENT_URL` | Yes | Frontend origin for CORS |
| `JWT_ACCESS_SECRET` | Yes | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret for signing refresh tokens |
| `BREVO_API_KEY` | Yes | Brevo API key for transactional email |
| `BREVO_SENDER_EMAIL` | Yes | From address for emails |
| `BREVO_SENDER_NAME` | No | From name for emails |
