const database = require('./dataSource');

const getReservationByUserId = async (userId) => {
    try{
        return await database.query(`
            SELECT
                c.name city,
                u.name hostName,
                JSON_ARRAYAGG(i.url) imageUrl,
                (
                    SELECT
                        JSON_OBJECT(
                            "checkIn",r.check_in,
                            "checkOut",r.check_out
                        )
                )reservation
            FROM reservations r
            LEFT JOIN products p ON p.id = r.product_id
            LEFT JOIN images i ON p.id = i.product_id
            LEFT JOIN cities c ON p.city_id = c.id
            LEFT JOIN hosts h ON h.id = p.host_id
            LEFT JOIN users u ON u.id = h.user_id       
            WHERE r.user_id = ${userId}
            GROUP BY r.id
        `);
    }

    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getReservationByUserId
}
