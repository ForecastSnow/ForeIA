import { userModel } from "./schemas/userSchema.js"


class UserDAO {

    constructor() {
        this.userModel = userModel

    }

    async createUser(payload) {

        try {

            const userExist = await this.findByEmailUser(payload.email)

            if (userExist.length != 0) {
                const customError = new Error("the user is already registered");

                customError.status = 400;

                throw customError;

            }

            return await this.userModel.create(payload)

        } catch (error) {
            throw error
        }

    }

    async findByEmailUser(email) {

        return await this.userModel.find({ email: email })

    }

    async findByIdUser(id) {

        return await this.userModel.findById(id)

    }

}


export const userDAO = new UserDAO();