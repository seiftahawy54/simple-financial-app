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
````

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