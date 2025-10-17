import jwt from "jsonwebtoken";



class AuthJWTUtil {

    constructor() {
        this.tokenOptions = {
            algorithm: 'HS256',
            expiresIn: '72h',
            issuer: "api.tomasperez.work"
        };
    }

    singToken(payload) {

        const user = {

            _id: payload._id.toString(),
            username: payload.username,
            email: payload.email

        }

        const token = jwt.sign(user, process.env.JWT_KEY, this.tokenOptions)

        return token

    }

    verifyToken(token) {

        try {

            const tokenDecoded = jwt.verify(token, process.env.JWT_KEY, this.tokenOptions)

            return tokenDecoded;

        } catch (error) {

            throw error;

        }

    }

    foreIANucleMicroserviceTokens() {

        const tokenOptionsForForeIANucle = {

            algorithm: 'HS256',
            expiresIn: "72h",
            issuer: "api.tomasperez.work"

        }

        return jwt.sign({}, process.env.FOREIANUCLEMICROSERVICE_TOKENKEY, tokenOptionsForForeIANucle)

    }

}

export const authJWTUtil = new AuthJWTUtil();