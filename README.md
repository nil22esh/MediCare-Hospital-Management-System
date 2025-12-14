# Medicare Hospital Management System

A comprehensive hospital management system built with MERN stack (MongoDB, Express.js, React, Node.js) that provides separate dashboards for patients, doctors, and administrators.

## 🌐 Live Deployments

- **Server API**: [https://medicare-hospital-management-system-61ma.onrender.com](https://medicare-hospital-management-system-61ma.onrender.com)
- **Admin Dashboard**: [https://medi-care-hospital-management-syste.vercel.app/](https://medi-care-hospital-management-syste.vercel.app/)
- **Patient Dashboard**: [https://medi-care-hospital-management-syste-blue.vercel.app/](https://medi-care-hospital-management-syste-blue.vercel.app/)

## 📁 Project Structure

The project consists of three main folders:

```
medicare-hospital-management/
├── Server/          # Backend API with all business logic
├── Admin/           # Admin & Doctor Dashboard (React)
└── Client/          # Patient Dashboard (React)
```

## 🚀 Features

### Patient Portal (Client)

- User registration and authentication
- Book appointments with doctors
- View appointment history
- Cancel appointments
- Online payment via Razorpay
- Update profile information
- Upload profile pictures

### Doctor Dashboard (Admin)

- Doctor login and authentication
- View all appointments
- Confirm or cancel appointments
- Access doctor dashboard with statistics
- Update profile information
- Manage availability status

### Admin Dashboard (Admin)

- Admin login and authentication
- Add new doctors to the system
- Manage all doctors
- View all appointments across the system
- Cancel appointments
- Change doctor availability
- Comprehensive dashboard with system statistics

## 🛠️ Technologies Used

### Backend (Server)

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Razorpay** - Payment gateway
- **Multer** - File upload handling
- **Winston** - Logging
- **Validator** - Input validation

### Frontend (Admin & Client)

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling (likely)

## 📦 Backend Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.8.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.19.4",
  "multer": "^2.0.2",
  "nodemon": "^3.1.11",
  "razorpay": "^2.9.6",
  "validator": "^13.15.23",
  "winston": "^3.18.3"
}
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Razorpay account

### Server Setup

1. Navigate to the Server directory:

```bash
cd Server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. Start the server:

```bash
npm run dev
```

### Admin Dashboard Setup

1. Navigate to the Admin directory:

```bash
cd Admin
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

4. Start the development server:

```bash
npm run dev
```

### Client Dashboard Setup

1. Navigate to the Client directory:

```bash
cd Client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

4. Start the development server:

```bash
npm run dev
```

## 📡 API Endpoints

### User Routes (`/api/user`)

- `POST /register-user` - Register new patient
- `POST /login-user` - Patient login
- `GET /get-user-profile` - Get patient profile (protected)
- `PUT /update-user-profile` - Update patient profile (protected)
- `POST /book-appointment` - Book appointment (protected)
- `GET /appointments-list` - Get patient appointments (protected)
- `PUT /cancel-appointment/:id` - Cancel appointment (protected)
- `PUT /razorpay-payment-appointment/:id` - Process payment (protected)
- `PUT /verify-payment` - Verify payment (protected)

### Doctor Routes (`/api/doctor`)

- `GET /get-doctors-list` - Get all doctors
- `POST /login` - Doctor login
- `GET /get-all-my-appointments` - Get doctor appointments (protected)
- `PUT /confirm-appointment/:id` - Confirm appointment (protected)
- `PUT /cancel-appointment/:id` - Cancel appointment (protected)
- `GET /get-doctor-dashboard` - Get dashboard data (protected)
- `GET /get-doctor-profile` - Get doctor profile (protected)
- `PUT /update-doctor-profile` - Update doctor profile (protected)

### Admin Routes (`/api/admin`)

- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor (protected)
- `GET /all-doctors` - Get all doctors (protected)
- `POST /change-availability` - Change doctor availability (protected)
- `GET /all-appointments` - Get all appointments (protected)
- `PUT /cancel-appointment/:id` - Cancel appointment (protected)
- `GET /get-admin-dashboard` - Get dashboard data (protected)

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication with three types of users:

- **Patients** - Access via Client dashboard
- **Doctors** - Access via Admin dashboard
- **Administrators** - Access via Admin dashboard

Tokens are stored in HTTP-only cookies for security.

## 📂 Backend Folder Structure

```
Server/
├── configs/          # Configuration files (DB, Cloudinary, etc.)
├── controllers/      # Route controllers
├── logs/            # Application logs
├── middlewares/     # Custom middleware (auth, validation, etc.)
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic services
├── uploads/         # Temporary file uploads
├── utils/           # Utility functions
├── validations/     # Request validation schemas
├── app.js           # Express app configuration
├── server.js        # Server entry point
└── package.json     # Dependencies
```

## 💳 Payment Integration

The system integrates Razorpay for online payment processing for appointment bookings.

## 📸 Media Management

Cloudinary is used for storing and managing user and doctor profile images.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Input validation
- CORS protection
- Cookie-based token storage
- Request validation middleware

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - Medicare Hospital Management System

## 📧 Contact

For any queries or support, please reach out through the project repository.

---

**Note**: Make sure to configure all environment variables properly before running the application in production.
