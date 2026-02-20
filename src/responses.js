function response(status, message, afftdrows, data = null) {
    return {
        status,
        message,
        afftdrows,
        data,
        timeStamp: new Date().getTime()
    }
}
function userReq(username, email, password) {
    return {
        username,
        email,
        password,
    }
}

module.exports = {
    response, userReq
}