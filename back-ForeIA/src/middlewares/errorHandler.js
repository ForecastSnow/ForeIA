export const errorHandler = (error, req, res, next) => {

    try {

        if (!error) {
            throw new Error("Something went terribly wrong")
        }

        const status = error.status || 500;

        res.status(status).send({ message: error.message })

    } catch (error) {

        res.status(500).send({ message: error.message })

    }

}