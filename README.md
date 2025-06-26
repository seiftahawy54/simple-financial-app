# Fintech Starter Pack

## Installation Prerequisites
- **Node.js** >= v20.0.0
- **MongoDB** >= v7.0
- **Docker & Docker Compose** (for containerized setup)

---

## Environment Variables

| Key       | Description         |
|-----------|---------------------|
| `NODE_ENV` | Application environment (e.g., development, production) |
| `MONGO_URL` | MongoDB connection URI |
| `PORT`     | Server listening port |

> To create your environment file, copy from the example:
>
> ```bash
> cp .env.example .env
> ```

---

## Getting Started

1. Install dependencies:

   ```bash
   npm install
    ```

2. Start the server in development mode:

   ```bash
   npm run dev
   ```

3. Run tests:

   ```bash
   npm run test
   ```

---

## Running with Docker

Start the app and MongoDB service using Docker Compose:

```bash
docker compose -f ./docker-compose.yml up -d
```

This will build and launch the containers in detached mode.

---

## Notes

* Make sure Docker and Docker Compose are installed and running before using the Docker commands.
* Adjust environment variables in your `.env` file or Docker Compose config as needed.

## Project Structure Overview

This project is organized to maintain clear separation of concerns and ease of maintenance:

- **`server.js`**  
  The entry point of the application that starts the HTTP server. It imports the app from `index.js` and listens on the configured port.

- **`index.js`**  
  Defines and exports the Express app instance. This file sets up middlewares, routes, and any global configurations. Separating the app creation from server startup facilitates easier testing.

- **`controllers/`**  
  Contains route handler functions that implement business logic for different API endpoints.

- **`middlewares/`**  
  Custom Express middleware functions for validation, error handling, authentication, etc.

- **`models/`**  
  Mongoose schemas and models representing database entities like accounts and transactions.

- **`routes/`**  
  Defines Express route declarations, connecting endpoints to their respective controllers.

- **`misc/`**  
  Miscellaneous files such as Swagger/OpenAPI configurations and utility scripts.

- **`tests/`**  
  Contains unit and integration tests to verify functionality and maintain code quality.

- **`Dockerfile` & `docker-compose.yml`**  
  Configuration files for containerizing the application and orchestrating services like MongoDB.

- **`package.json` & `yarn.lock`**  
  Dependency management and scripts for running, building, and testing the application.

This structure ensures modularity, scalability, and ease of collaboration across the development lifecycle.
