require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.API_KEY;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async(req,res) => {
    //Add url 
    const p_culinary_discoveries_url = 'https://api.hubapi.com/crm/v3/objects/p_culinary_discovery/?properties=name,origin,star_ingredients'
    //Headers
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        //get inforation
        const response = await axios.get(p_culinary_discoveries_url, { headers });
        const data = response.data.results;
        //render data
        res.render('homepage', { title: 'Home | Integrating With HubSpot I Practicum',  p_culinary_discoveries: data});
    } catch (error) {
        console.error(error);
    }
})

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req,res) => {
    try {
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
    } catch (error) {
        
    }
})

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req,res) => {
    //add properties
    const properties = {
        "properties": {
            "name": req.body.newName,
            "origin": req.body.origin,
            "star_ingredients": req.body.starIngredients
        }
    }
    //headers
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    //Url Update
    const url ="https://api.hubapi.com/crm/v3/objects/p_culinary_discovery/";
    //Update information
    try {
        await axios.post(url, properties, { headers })
        res.redirect('/');
    } catch (error) {
        
    }
})

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));