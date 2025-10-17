import bcrypt from "bcrypt";
import { userDAO } from "../DAOs/userDAO.js";

class UserService {

    async createUser(payload) {

        try {

            const { username, email, plainPassword } = payload

            const hashPassword = await bcrypt.hash(plainPassword, 10);

            const newUser = { username, email, hashPassword }

            const isRegister = await this.findUserByEmail(email)

            if (isRegister.length != 0) {
                const error = new Error("Conflict")
                error.status = 409
                throw error
            }

            await userDAO.createUser(newUser)

            return

        } catch (error) {

            throw error

        }

    }

    async findUserByEmail(email) {

        return await userDAO.findByEmailUser(email);

    }

}

export const userService = new UserService()






