# dsg-api-sandbox

### Project Setup

#### 1. Install Dependencies
```bash
npm install i
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
nano .env
```

Paste the following content:

```env
DEBUG="app:*"
NODE_ENV="development"
MONGO_URL="mongodb://localhost:27017/DSG"
DB_NAME="DSG"
JWT_SECRET="ABCD1234"
PORT="3000"
FINANCE_API_URL="http://localhost:3001"
```

Save and close the file (`Ctrl + X`, then `Y`, then `Enter`).

---

### Running the Project

Use the following command to start the server in development mode:

```bash
npm run dev
```

Ensure your `package.json` includes:

```json
    "engines": {
        "node": ">=20.18.1 <21.0.0"
    },
    "type": "module",
    "scripts": {
        "dev": "nodemon src/index.js",
        "start": "node src/index.js",
    }
```
