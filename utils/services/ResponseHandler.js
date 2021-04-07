module.exports = {
    sendResponseOkay: (response, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(response));
    },

    sendNotAcceptableResponse: (err, res) => {
        res.writeHead(406, {'Content-Type': 'text/plain'});
        res.end(err);
    }
};
