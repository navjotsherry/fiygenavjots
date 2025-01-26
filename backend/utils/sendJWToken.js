//Create token and save in Cookie
import jwt from 'jsonwebtoken'

export const sendJWToken = (user,statusCode,res) =>{
    const token = jwt.sign(
        { id: user.id }, // Include the user ID as the payload
        process.env.JWT_SECRET_KEY, // Secret key
        { expiresIn: process.env.JWT_TOKEN_EXPIRE } // Token expiration
      );

    //Options for Cookie
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 *60*60*1000
        ),
        sameSite:"none",
        secure:true,
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}