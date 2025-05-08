module.exports.errorResponse_badRequest = (res) => {
    res.status(400).send({ success: false, message: "Bad Request" })
}

module.exports.errorResponse_unauthorized = (res) => {
    res.status(401).send({ success: false, message: "Unauthorized" })
}

module.exports.errorResponse_alreadyExists = (res, message) => {
    res.status(403).send({ success: false, message })
}

module.exports.errorResponse_catchError = (res, message) => {
    res.status(500).send({ success: false, message })
}