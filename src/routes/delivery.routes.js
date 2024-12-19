const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { validateDeliveryRequest, validateSaveDeliveryRequest } = require('../middlewares/validations');

router.post('/calculate-fee', validateDeliveryRequest, deliveryController.calculateDeliveryFee);
router.post('/save-delivery', validateSaveDeliveryRequest, deliveryController.saveDeliveryDetails);

module.exports = router;