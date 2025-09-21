import bcrypt from "bcrypt";
import { userDAO } from "../DAOs/userDAO.js";

class UserService {

    async createUser(payload) {

        try {

            const { username, email, plainPassword } = payload

            const hashPassword = await bcrypt.hash(plainPassword, 10);

            const newUser = { username, email, hashPassword }

            return await userDAO.createUser(newUser)

        } catch (error) {

            throw error

        }

    }

    async findUserByEmail(email) {

        return await userDAO.findByEmailUser(email);

    }

}

export const userService = new UserService()






