module.exports = function (error, request, response, next) {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' });
    };

    next(error);
};
