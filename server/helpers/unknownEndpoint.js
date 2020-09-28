module.exports = function (request, response) {
    response.status(404).json({ error: 'unknown endpoint' });
};

