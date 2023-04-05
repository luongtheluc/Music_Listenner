const userRouter = require('./userRoutes');
const { notFound, errorHandler } = require('../middlewares/errorHandler')


const initRoutes = (app) => {
    app.use('/api/user', userRouter);

    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoutes