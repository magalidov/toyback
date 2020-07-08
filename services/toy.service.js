const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    save,
    query,
    remove,
    getById,
}

function query() {
    return Promise.resolve(toys);
}

function getById(id) {
    const toy = toys.find(toy => toy._id === id)
    if(toy) return Promise.resolve(toy);
    return Promise.reject('Toy could not find');
}

function remove(id) {
    const idx = toys.findIndex(toy => toy._id === id)
    if (idx >= 0) toys.splice(idx, 1)
    _saveToysToFile()
    return Promise.resolve();
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys.splice(idx, 1, toy)
    } else {
        toy._id = _makeId()
        toys.unshift(toy)
    }
    _saveToysToFile()
    return Promise.resolve(toy);
}


function _saveToysToFile() {
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2));
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}