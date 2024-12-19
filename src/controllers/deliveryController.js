const HttpStatus = require('../utils/httpStatus');
const Messages = require('../utils/messages');
const { createResponse } = require('../utils/responseHandlers');
const deliveryService = require('../services/deliveryService');
//const { validateDeliveryRequest, validateSaveDeliveryRequest } = require('../utils/validators');
const calculateDeliveryFee = async (req, res, next) => {
    try {
        const { origin, destination } = req.body;


        const result = await deliveryService.calculateFee(origin, destination);

        res.status(HttpStatus.OK).json(
            createResponse(
                true,
                Messages.SUCCESS.DELIVERY_CALCULATED,
                result
            )
        );
    } catch (error) {
        logger.error('Error calculating delivery fee:', error);
        next(error);
    }
};

const saveDeliveryDetails = async (req, res, next) => {
    try {
        const { origin, destination, fee, distance, orderId } = req.body;

        // Validate input
        const validationError = validateSaveDeliveryRequest({ origin, destination, fee, distance, orderId });
        if (validationError) {
            return res.status(HttpStatus.BAD_REQUEST).json(
                createResponse(false, validationError)
            );
        }

        const result = await deliveryService.saveDelivery({
            origin,
            destination,
            fee,
            distance,
            orderId
        });

        res.status(HttpStatus.CREATED).json(
            createResponse(
                true,
                Messages.SUCCESS.ORDER_CREATED,
                result
            )
        );
    } catch (error) {
        logger.error('Error saving delivery details:', error);
        next(error);
    }
};

module.exports = {
    calculateDeliveryFee,
    saveDeliveryDetails,
};