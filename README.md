# README.md for Groupera Backend

## Overview
Welcome to the Groupera Backend! This is the heart of our project, a Node.js API built on Express. Groupera is all about bringing people together, and our backend makes sure everything runs smoothly. Whether you're a developer diving into the code or just curious about how things work, you've come to the right place.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- A soul for coding (just kidding, but enthusiasm helps!)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/groupera-backend.git 
   ```
2. Enter the directory:
   ```bash
   cd groupera-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create & update .env file by copying .env.example
   ```bash
   cp -R .env.example .env
   ```

### Running the Server
Run the server with:
```bash
npm start
```

The magic happens on `http://localhost:8080` by default!

## Features
- **User Authentication**: Secure login and registration.
- **Group Management**: Create, edit, and manage groups.
- **Event Scheduling**: Organize and keep track of events.
- ...

## API Endpoints
Here’s a sneak peek of our main endpoints:

| Method | Endpoint                                | Description                                          |
|--------|-----------------------------------------|------------------------------------------------------|
| POST   | /auth/sigup                             | Log in to an existing user                           |
| PATCH  | /auth/verifyEmail                       | Verify email address based on generated 4 digit code |
| GET    | /auth/login                             | Log in to an existing user                           |
| POST   | /auth/resetPasswordRequest              | Request reset password instruction email             |
| POST   | /auth/resetPassword/:resetPasswordToken | Reset password based on generated uuid token         |
| POST   | /auth/logout                            | Log out current user or rather clear all cookies     |
| POST   | /auth/refresh                           | Refresh auth & refresh tokens                        |
| GET    | /group                                  | Fetch all groups                                     |
| POST   | /group                                  | Create a new group                                   |
| PATCH  | /group/:groupId                         | Update group with :groupId                           |
| ...    | ...                                     | ...                                                  |

(This list is still a working progress)

## Testing
Run the tests with:
```bash
npm test
```
Because who likes bugs, right?

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Website: [groupera.de](https://groupera.de)<br/>
Software Support - softwaresupport@groupera.de<br/>
Customer Support - support@groupera.de <br/>
Project Link: [https://github.com/groupera-page/groupera-backend](https://github.com/groupera-page/groupera-backend)