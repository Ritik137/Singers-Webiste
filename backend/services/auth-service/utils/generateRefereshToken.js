const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) => {

    return jwt.sign(

        {
            id: user._id
        },

        process.env.REFRESH_SECRET,

        {
            expiresIn: "30d"
        }

    );

};

module.exports = generateRefreshToken;