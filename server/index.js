const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');


dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());


//Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


// Use the routes
app.use('/api/auth', authRoutes);  
app.use('/api/user', protectedRoute); // Protected routes
app.use('/api', taskRoutes);
app.use('/api', projectRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

