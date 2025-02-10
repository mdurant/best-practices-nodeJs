process.loadEnvFile();
const express = require('express');
const morgan = require('morgan');
const winston = require('./config/logger');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    winston.info(`Server running on port ${PORT}`);
});