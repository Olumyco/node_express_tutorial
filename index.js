const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const baseUrl = 'http://localhost:4000';

app.use(express.json());
//app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {  //() => {} === function(req, res) {}
    let data = {
        name: 'Donald',
        age: 45
    }
   
    res.json(data);
});
 
app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, users) => {
        if (err) throw err;

        let data = JSON.parse(users);
        res.json(data);
    });
});

app.get('/anotherApi', (req, res) => {
    axios({
        method: 'get',
        url: '/users',
        baseURL: 'https://jsonplaceholder.typicode.com'
    })
    .then(resp => {
        res.json(resp.data);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get('/message', (req, res) => {
    axios({
        method: 'get',
        url: `${baseUrl}/message`
    })
    .then(resp => {
        res.json(resp.data);
    })
    .catch(err => {
        res.json(err);
    });
})

app.get('/food/:id', function(req, res) {
    console.log(req.params);

    let food = {
        africa: ['Pounded yam', 'Beans'],
        asia: ['Rice', 'Potato']
    }

    let data = Object.keys(req.params).length === 0 ? food : {[req.params.id]: food[req.params.id]};

    res.json(data);
});

app.get('/countries', (req, res) => {
    console.log(req.query);
    let countries = ['Nigeria', 'USA', 'Ghana']

    let countryCapital = [
        {
            name: 'Nigeria',
            capital: 'Abuja'
        },
        {
            name: 'USA',
            capital: 'Washington D.C'
        },
        {
            name: 'Ghana',
            capital: 'Accra'
        }
    ];

    let data;

    if (Object.keys(req.query).length === 0) {
        data = {countries: countries}
    } else {
        typeof req.query.capitals !== 'undefined' ? JSON.parse(req.query.capitals) ? data = {countries: countryCapital} : data = {countries: countries} : data = {message: 'Not Found!'};
    }

    res.json(data);
});

app.get('/phones', function(req, res) {
    console.log(req.query);
    
    let phones = [
        {
            name: 'Techno'
        },
        {
            name: 'Nokia'
        },
        {
            name: 'Samsung'
        },
        {
            name: 'Itel'
        }
    ];

    // let phone = phones.find(function(data) {
    //     return data.name.toLowerCase() === req.params.id;
    // });

    let phone = phones.find(function(data) {
        return data.name.toLowerCase() === req.query.name.toLowerCase();
    });

    let data = phone ? phone : phones

    res.json({data: data});
});

app.post('/jobs', function(req, res) {
    console.log(req.body);
    res.json({
        msg: 'ok'
    });
});

app.put('/pastors', function(req, res) {
    console.log(req.body);
    res.json({
        msg: 'ok'
    });
});

app.route('/laptop')
    .get((req, res) => {
        res.json({
            msg: 'get'
        });
    })
    .post((req, res) => {
        res.json({
            data: req.body
        });
    })
    .put((req, res) => {
        res.json({
            msg: 'Updated!'
        });
    })
    .delete((req, res) => {
        res.json({
            msg: 'Data deleted!'
        })
    })


// hard coding your data

// getting data from a json file

// getting data from another api

// getting data from a database

// getting data through crawling a website

app.listen(port, () => console.log(`Server running on port ${port}`));