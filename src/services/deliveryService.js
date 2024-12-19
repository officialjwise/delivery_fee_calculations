const supabase = require('../config/database');
const Messages = require('../utils/messages');
const HttpStatus = require('../utils/httpStatus');

const BASE_FARE = 5.00;
const PER_KM_RATE = 0.50;

class DeliveryService {
    static async calculateFee(origin, destination) {
        try {
            const distance = await this.calculateDistance(origin, destination);
            const fee = BASE_FARE + (distance * PER_KM_RATE);

            return {
                fee: Number(fee.toFixed(2)),
                distance: Number(distance.toFixed(2)),
            };

        } catch (error) {
            throw new Error(Messages.ERROR.CALCULATION_FAILED);
        }
    }

    static async calculateDistance(origin, destination) {
        // In a real-world application, this method would call the Google Maps API
        // to calculate the distance between two points
        const R = 6371;
        const dLat = this.deg2rad(destination.lat - origin.lat);
        const dLon = this.deg2rad(destination.lng - origin.lng);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(origin.lat)) * Math.cos(this.deg2rad(destination.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    static deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    static async saveDelivery(deliveryData) {
        const { data, error } = await supabase
            .from('deliveries')
            .insert(deliveryData)
            .select();

        if (error) {
            throw new Error(Messages.ERROR.DATABASE_ERROR);
        }

        return data[0];
    }
}
module.exports = DeliveryService;