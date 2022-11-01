const database = require('./dataSource');

const getProductDetailsByProductId = async (productId) => {
    try{
        return await database.query(`
        SELECT
            p.id,
            p.title,
            p.price,
            p.city_id,
            p.description,
            p.bed_quantity bed,
            p.bedroom_quantity bedroom,
            p.bathroom_quantity bathroom,
            JSON_ARRAYAGG(i.url) imageUrl,
            h.guest_id hostId,
            h.description hostDesc
        FROM products p
        INNER JOIN images i ON i.product_id = p.id
        INNER JOIN hosts h ON p.host_id = h.id
        WHERE p.id = ?
        `, [productId]);
    }

    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getProductDetailsByProductId
}