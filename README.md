# Authentication Boilerplate with MERN and PERN Stacks

This repository contains boilerplate code for creating a full-stack web application with authentication using both MERN (MongoDB, Express.js, React.js, Node.js) and PERN (PostgreSQL, Express.js, React.js, Node.js) stacks. The code is available in  TypeScript as of now but later javascript code will also be added.

## Features

- 👤 User registration and login
- #️⃣ Secure password hashing
- 🪙 JSON Web Token (JWT) authentication
- 🍪 Setting Cookies
- 🔒 Middleware for route protection
- ⚠️ Error handling

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/13paras/auth-boilerplate.git

2. Install the dependencies

 ```bash
 cd auth-boilerplate/Typescript/mern-auth/backend
 npm install
 ```

3 Create a .env file in the root directory and add your environment variables

   ``` makefile
   NODE_ENV=development
   MONGO_PASSWORD=
   MONGODB_URI=
   PORT=8000
   JWT_SECRET_KEY=
   CORS_ORIGIN=
```

4. Run the development server:

```bash
npm run dev
```

5. Start building or customize according to your needs.


### Usage

This boilerplate provides a solid foundation for implementing user authentication in your MERN/PERN stack applications. You can customize and extend the existing functionalities based on your specific project requirements.

## License

[MIT](https://choosealicense.com/licenses/mit/)







