const appDataSource = require('./dataSource');
const { reservationStatusEnum } = require('../enum')

const postReservation = async ( userId, productId, checkIn, checkOut, guestCount ) => {

    try {
        const result = await appDataSource.query(`
            INSERT INTO reservations (
                user_id,
                product_id,
                check_in,
                check_out,
                guest_count,
                reservation_status_id
            ) VALUE ( ?, ?, ?, ?, ?, ${reservationStatusEnum.COMPLETE} )
            `, [ userId, productId, checkIn, checkOut, guestCount ]
        );
        return result;
    } catch (err) {
        const error = new Error('FAILED');
        error.statusCode = 500;
        throw err;
    }
}

const validationChecker = async ( productId, userId, checkIn, checkOut, guestCount, stayLength ) => {
    const queryRunner = appDataSource.createQueryRunner();

    const guestCheck = async (productId) => {
        const guestValidation = await appDataSource.query(`
            SELECT
                guest_max
            FROM products
            WHERE id = ${productId}
    `);
        return guestValidation;
    }
    const guestValidation = await guestCheck(productId);

    const priceCheck = async (productId) => {
        const priceValidation = await appDataSource.query(`
            SELECT 
                price
            FROM products
            WHERE id = ${productId}
    `);
        return priceValidation
    }
    const priceValidation = await priceCheck(productId);

    const pointCheck = async (userId) => {
        const pointValidation = await appDataSource.query(`
            SELECT
                point
            FROM users
            WHERE id = ${userId}
    `);
        return pointValidation;
    }
    const pointValidation = await pointCheck(userId);
    
    const dateCheck = async (productId) => {
        const dateValidation = await appDataSource.query(`
            SELECT
                JSON_ARRAYAGG(       
                    JSON_OBJECT(
                        'reservationCheckIn',check_in,
                        'reservationCheckOut',check_out
                    )
                )dateValidation
            FROM reservations
            WHERE product_id = ${ productId }
    `)
        return dateValidation;
    }
    const dateValidation = await dateCheck(productId);
    const reservationValidate = dateValidation[0].dateValidation;

    try{
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if( guestValidation[0].guest_max < guestCount ){
            const err = new Error('OVER CAPACITY');
            err.statusCode = 400;
            throw err;
        }

        if( priceValidation[0].price * stayLength  > pointValidation[0].point){
            const err = new Error ('NOT ENOUGH POINT');
            err.statusCode = 400;
            throw err;
        }
        
        function getDatesStartToLast(startDate, endDate) {
            const arrayStartToLastDate = [];
            const arrDate = new Date(startDate);
            
            while(arrDate <= new Date(endDate)) {
                arrayStartToLastDate.push(arrDate.toISOString().split("T")[0]);
                arrDate.setDate(arrDate.getDate() + 1);
            }
            return arrayStartToLastDate;
        }
        const arrayPostReservation = getDatesStartToLast(checkIn,checkOut)
        const arrayGetReservation =[]; 

        if(reservationValidate !== null){
            
            for(let baseNumber = 0; baseNumber< reservationValidate.length; baseNumber++){
                arrayGetReservation.push(getDatesStartToLast(reservationValidate[baseNumber].reservationCheckIn,reservationValidate[baseNumber].reservationCheckOut))
            } 
        
            for(let baseNumber=0; baseNumber<arrayPostReservation.length; baseNumber++){ 
                if((arrayGetReservation.flat()).includes(arrayPostReservation[baseNumber])) {
                    const err = new Error ('RESERVATION IS NOT POSSIBLE');
                    err.statusCode = 400;
                    throw err;
                }
            }
        }
        await queryRunner.query(`
            UPDATE users 
            SET point = point - ${ priceValidation[0].price * stayLength } 
            WHERE id = ${userId}
        `)
        
        postReservation( userId, productId, checkIn, checkOut, guestCount );

        await queryRunner.commitTransaction();
        await queryRunner.release();
        return;
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

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
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getReservationByUserId,
    validationChecker,
    postReservation
}
