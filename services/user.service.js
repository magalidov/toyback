module.exports = {
    checkUser
}

function checkUser(user) {
    if(user.userName) return Promise.resolve(user);
    return Promise.reject('Invalid userName');
}