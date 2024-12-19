const httpStatus = require('../utils/httpStatus');
const Messages = require('../utils/messages');

const validateDeliveryRequest = (req, res, next) => {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: Messages.ERROR.INVALID_DELIVERY_REQUEST,
            error: {
                status: httpStatus.BAD_REQUEST,
                message: Messages.ERROR.INVALID_DELIVERY_REQUEST,
                error: 'Origin and destination are required',
            }
        });
    }

    if (!validatingCoordinates(origin) || !validatingCoordinates(destination)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: Messages.ERROR.INVALID_COORDINATES,
            error: {
                status: httpStatus.BAD_REQUEST,
                message: Messages.ERROR.INVALID_COORDINATES,
                error: 'Invalid coordinates',
            }
        });

    next();
    };

    const validatingCoordinates = (location) => {
        const { lat, lng } = location;
        return (
            typeof lat === 'number' &&
            typeof lng === 'number' &&
            lat >= -90 && lat <= 90 &&
            lng >= -180 && lng <= 180
        );
    };

    module.exports = {
        validateDeliveryRequest,
    };
};