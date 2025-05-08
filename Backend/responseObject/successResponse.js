module.exports.successResponse_ok = (res, message, data) => {
    res.status(200).send({ success: true, message, data })
}

module.exports.successResponse_ok_withToken = (res, message, data, token) => {
    res.status(200).send({ success: true, message, data, token })
}

module.exports.successResponse_created= (res, message, data) => {
    res.status(201).send({ success: true, message, data })
}