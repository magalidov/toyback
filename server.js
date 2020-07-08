const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const toyService = require('./services/toy.service');
const userService = require('./services/user.service');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));


// LIST
app.get('/api/toy', (req, res) => {
    toyService.query().then(toys => {
        res.json(toys);
	});
});

// READ
app.get('/api/toy/:id', (req, res) => {
    const toyId = req.params.id;
	toyService.getById(toyId).then(toy => {
        res.json(toy);
	});
	// .catch(err => err)
});

// DELETE
app.delete('/api/toy/:id', (req, res) => {
    const toyId = req.params.id;
	toyService.remove(toyId).then(() => {
        res.end();
	});
});

// CREATE
app.post('/api/toy', (req, res) => {
    const toy = req.body;
	toyService.save(toy).then(savedToy => {
        console.log('Saving...', savedToy);
		res.json(savedToy);
	});
});

// UPDATE
app.put('/api/toy/:id', (req, res) => {
    const toy = req.body;
	toyService.save(toy).then(savedToy => {
        console.log('Saving...', savedToy);
		res.json(savedToy);
	});
});

app.post('/api/login', (req, res) => {
    const credentials = req.body;
	userService
    .checkUser(credentials)
    .then(user => {
        res.cookie('user', user.userName);
        res.json(user.userName);
    })
    .catch(err => res.status(401).send(err));
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('user');
	res.end();
});


app.listen(port, () => console.log(`App listening on port ${port} !`));