const appDataSource = require('./dataSource');

const createUser = async(kakaoId, name, profileImage, email, birthday, phoneNumber, DEFAULT_POINT) => {

    const result = await appDataSource.query(`
        INSERT INTO users (
            name,
            profile_image,
            kakao_id,
            email,
            birth,
            phone_number,
            point
        )
        VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [name, profileImage, kakaoId, email, birthday, phoneNumber, DEFAULT_POINT]
    )

    return result.insertId
};

const getUserByKaKaoId = async(kakaoId) => {
    const result = await appDataSource.query(`
        SELECT
            u.id AS userId,
            u.kakao_id AS kakaoId,
            u.name,
            h.id AS hostId
        FROM users u
        LEFT JOIN hosts h ON u.id=h.user_id
        WHERE u.kakao_id=?;`,
        [kakaoId]
        )
    
    return result[0];
};

const getUserById = async(userId) => {
    const result = await appDataSource.query(`
        SELECT
            u.id AS userId,
            u.name,
            h.id AS hostId
        FROM users u
        LEFT JOIN hosts h ON u.id=h.user_id
        WHERE u.id=?;`,
        [userId]
    )
    
    return result[0];
};

const updateUserInfo = async(kakaoId, name, profileImage) => {
    const result = await appDataSource.query(`
        UPDATE users
        SET
            name=?,
            profile_image=?
        WHERE kakao_id=?;`,
        [name, profileImage, kakaoId]
    )
    return result.info;
}

module.exports = {
    createUser,
    getUserByKaKaoId,
    getUserById,
    updateUserInfo
}