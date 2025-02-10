const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Mostrar logs en consola en desarrollo
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// 🔹 Stream compatible con Morgan
logger.stream = {
    write: function(message) {
        logger.info(message.trim());
    }
};

module.exports = logger;
