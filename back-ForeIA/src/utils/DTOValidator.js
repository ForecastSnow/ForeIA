import yup from "yup";

class DTOValidator {

    validate(DTO, payload) {

        try {

            const validData = DTO.validateSync(payload, {
                abortEarly: true,
                stripUnknown: true,
            });
            return validData;
        } catch (error) {

            error.status = 400;

            throw error;
        }
    }


    userDTO(payload) {

        try {

            const userDTO = yup.object().shape({
                username: yup.string().required().min(3).max(15),
                plainPassword: yup.string().required().min(4),
                email: yup.string().email().required()
            });

            return this.validate(userDTO, payload)

        } catch (error) {

            throw error
        }

    }

    loginDTO(payload) {

        try {

            const loginDTO = yup.object().shape({
                plainPassword: yup.string().required().min(4),
                email: yup.string().email().required()
            });

            return this.validate(loginDTO, payload)

        } catch (error) {

            throw error
        }

    }

    iaTextMessage(payload) {

        try {

            const iaTextMessageDTO = yup.object().shape({

                userId: yup.string().required(),
                chatId: yup.string().required(),
                message: yup.string().required()

            });

            return this.validate(iaTextMessageDTO, payload)

        } catch (error) {

            throw error
        }

    }

    iaNewChatTextMessage(payload) {

        try {

            const iaNewChatTextMessage = yup.object().shape({

                userId: yup.string().required(),

                message: yup.string().required()

            });

            return this.validate(iaNewChatTextMessage, payload)

        } catch (error) {

            throw error
        }

    }

}



export const DTOValidatorUtil = new DTOValidator();