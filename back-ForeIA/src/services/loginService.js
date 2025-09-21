import { userService } from "./userService.js"
import { authJWTUtil } from "../utils/AuthJWTUtil.js";
import bcrypt from "bcrypt";


class LoginService {

    constructor() { }

    async login(payload) {

        try {

            function invalidCredentials() {
                const customError = new Error("user or password invalid");

                customError.status = 401;

                throw customError;

            };

            const userExist = await userService.findUserByEmail(payload.email);

            if (userExist.length === 0) invalidCredentials()

            if (!(await bcrypt.compare(payload.plainPassword, userExist[0].hashPassword))) invalidCredentials()

            return await authJWTUtil.singToken(userExist[0]);;

        } catch (error) {

            throw error

        }

    }

}


export const loginService = new LoginService()