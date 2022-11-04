const appDataSource = require('./dataSource');

const hostingProductByUserId = async ( userId, title, price, latitude, longitude, description, 
      bed, bedroom, bathroom, guestMax, buildingTypeId, cityId, themeId, hostDescription, images ) => {
        
    const queryRunner = appDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
            const authorizeHostByUserId = async ( userId, hostDescription ) => {

                const host = await queryRunner.query(`
                    INSERT INTO hosts (
                        user_id,
                        description
                    ) SELECT ?, ? 
                    WHERE NOT EXISTS(
                        SELECT user_id FROM hosts
                        WHERE user_id=${userId}
                    )`,[ userId, hostDescription ]
                )

                if(host.insertId === 0){
                    const whenHostOverlap = await queryRunner.query(`
                        SELECT 
                            id 
                        FROM hosts 
                        WHERE user_id = ${userId}
                    `)
                    
                    return whenHostOverlap[0].id
                }
                return host.insertId;
            }
            const hostId = await authorizeHostByUserId( userId, hostDescription ) 

            const products = await queryRunner.query(`
                INSERT INTO products (
		            host_id,
                    title,
                    price,
                    latitude,
                    longitude,
                    description,
                    bed_quantity,
                    bedroom_quantity,
                    bathroom_quantity,
                    guest_max,
                    building_type_id,
                    city_id,
                    theme_id
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
                [ hostId, title, price, latitude, longitude, 
                        description, bed, bedroom, bathroom, guestMax, buildingTypeId, cityId, themeId ]
                );
                for(let baseNumber = 0; baseNumber < 5; baseNumber++){
                    queryRunner.query(`
                        INSERT INTO images(
                            url,
                            product_id
                        ) VALUES ( '${images[baseNumber]}', ${products.insertId} )
                            
                    `)
                }
                
        
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return ;

    } catch (err) {
        const error = new Error('FAILED');
        error.statusCode = 500;
        
        await queryRunner.rollbackTransaction()
        await queryRunner.release();
        throw error;
    }
}

module.exports = {
    hostingProductByUserId
}