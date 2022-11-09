const productDao = require('../models/productDao');

const getProductDetailsByProductId = async (productId) => {
    
    return await productDao.getProductDetailsByProductId(productId);
}

const getFilteredOption = async(lowprice, highprice, bed, bathroom, bedroom, apartmentType, guesthouseType, hotelType, themeId, guest, city, checkIn, checkOut, limit, offset) => {

    const filteredRerservationDate = async (checkIn, checkOut) => {

        if((!checkIn && !checkOut) || (!checkIn || !checkOut)){
            return `GROUP by r.product_id
                ) reservations on p.id = reservations.productId`;
        }

        else if(checkIn && checkOut){
            return `WHERE (
                        p.id IN (SELECT r.product_id FROM reservations WHERE r.check_in BETWEEN ${checkIn} AND ${checkOut})
                        OR p.id IN (SELECT r.product_id FROM reservations WHERE r.check_out BETWEEN ${checkIn} AND ${checkOut})
                    )
                    OR p.id IN (SELECT r.product_id FROM reservations WHERE ${checkIn} BETWEEN r.check_in AND r.check_out)
                    GROUP by r.product_id
                    ) reservations ON p.id = reservations.productId WHERE reservations.reservedDates is NULL`
        }
    }
    
    const reservationDateOption = await filteredRerservationDate(checkIn, checkOut);

    const filteredOption = async(bed, bathroom, bedroom, apartmentType, guesthouseType, hotelType, themeId) => {

        let result = `WHERE`;
        let result2 = ``;
        let count = 0;
        let count2 = 0; 

        if((!checkIn && !checkOut) || (!checkIn || !checkOut)){
       
            if(bed){
                result += ` p.bed_quantity = ${+bed}`;
                count++;
            }
            if(bathroom){
                if(count==0) result += ` p.bathroom_quantity = ${+bathroom}`; 
                else result += ` and p.bathroom_quantity = ${+bathroom}`;
                count++;    
            }
            if(bedroom){
                if(count==0) result += ` p.bedroom_quantity = ${+bedroom}`;    
                else result += ` and p.bedroom_quantity = ${+bedroom}`;
                count++;
            }
            if(apartmentType){
                result2 += ` b.id = ${+apartmentType}`;
                count2++;
            }
            if(guesthouseType){
                if(count2==0) result2 += ` b.id = ${+guesthouseType}`;
                else result2 += ` or b.id = ${+guesthouseType}`;
                count2++;
            }
            if(hotelType){
                if(count2==0) result2 += ` b.id = ${+hotelType}`;
                else result2 += ` or b.id = ${+hotelType}`;
                count2++;
            }
            
            if(count==0 && count2!=0) result += result2;
            if(count!=0 && count2!=0) result = result + ` and (` + result2 + `)`
            if(count==0 && count2==0) result = ``;
            
            if(themeId){
                if(!count && !count2) result = `WHERE t.id = ${+themeId}`;
                if(count || count2) result += ` and t.id = ${+themeId}`;
            }

            if(!themeId){
                if(!count && !count2) result = ``;
                else result += ``;
            }
    
            return result;

        }
        
        else if(checkIn && checkOut){
       
            if(bed) result2 += ` and p.bed_quantity = ${+bed}`;
                
            if(bathroom) result2 += ` and p.bathroom_quantity = ${+bathroom}`; 
                
            if(bedroom) result2 += ` and p.bedroom_quantity = ${+bedroom}`;
                
            if(apartmentType){
                result2 += ` and b.id = ${+apartmentType}`;
                count++;
            }
            if(guesthouseType){
                if(count==0) result2 += ` and b.id = ${+guesthouseType}`;
                else result2 += ` or b.id = ${+guesthouseType}`;
                count++;
            }
            if(hotelType){
                if(count==0) result2 += ` and b.id = ${+hotelType}`;
                else result2 += ` or b.id = ${+hotelType}`;
                count++;
            }
         
            if(themeId) result2 += ` and t.id = ${+themeId}`;
            
            if(!themeId) result2 += ``;
            
            return result2;

        }
    }
    
    const roomTypeOption = await filteredOption(bed, bathroom, bedroom, apartmentType, guesthouseType, hotelType, themeId);
    
    const filteredCity = async (city) => {
        if(city){
            if( checkIn && checkOut || roomTypeOption) return ` AND c.id = ${+city}`;
            if((!checkIn && !checkOut) || (!checkIn || !checkOut) || !roomTypeOption) return ` WHERE c.id = ${+city}`;
        }
        else return ``;
    }

    const cityOption = await filteredCity(city);
    
    const filteredPrice = async (lowprice, highprice) => {

        if(!lowprice && !highprice) return `HAVING p.price > 0`;
        else if(lowprice && !highprice) return `HAVING p.price >= ${+lowprice}`;
        else if(!lowprice && highprice) return `HAVING p.price <= ${+highprice}`;
        else return `HAVING p.price >= ${+lowprice} AND p.price <= ${+highprice}`;
    }

    const priceOption = await filteredPrice(lowprice, highprice);
   
    const filteredGuestCount = async (guest) => {
        if(guest) return ` AND p.guest_max >= ${+guest}`
        else return ``;
    }

    const guestOption = await filteredGuestCount(guest);

    const filteredLimitOffset = async (limit, offset) => {
        if(limit && offset) return `LIMIT ${limit} OFFSET ${offset}`;
        else if(limit && !offset) return `LIMIT ${limit}`;
        else return ``; 
    }

    const limitOffsetOption = await filteredLimitOffset(limit, offset);

    return await productDao.getFilteredOption(reservationDateOption, roomTypeOption, cityOption, priceOption, guestOption, limitOffsetOption);
}
    

module.exports = { 
    getProductDetailsByProductId,
    getFilteredOption
}

