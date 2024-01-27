# Booking Application

##  Tech Stack

- HTML
- TailwindCSS
- React.js
- Node.js
- MongoDB
- JWT Authentication

 
## Local Development

#### Step-1

clone this repo

```sh
git clone https://github.com/Swoyam1/holidays-booking-mern-app.git
```

#### Step-2

Install all dependencies

```sh
# install server side deps
cd backend
npm install

# install client side deps
cd frontend
npm install
```

#### Step-3: Starting the client-side application

To Run the application in development mode execute this script

```sh
cd frontend
npm run dev
```

#### Step-4: Starting the server

Finally to start the server execute this script

```sh
cd backend
npm run dev
```

### .env File Configuration

```sh
# backend

MONGO_URL = "Your MongoDB URL" 
JWT_SECRET_KEY = "Your key"
FRONTEND_URL = "Your localhost url"
CLOUDINARY_CLOUD_NAME = "Your key"
CLOUDINARY_API_KEY = "Your key"
CLOUDINARY_API_SECRET = "Your key"

# frontend

VITE_API_BASE_URL = http://localhost:7000
```

<br />

