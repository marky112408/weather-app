// CORE MODULE
const path = require('path');
// NPM MODULE
const express = require('express');
const hbs = require('hbs');
// CUSTOM MODULE
const app = express();
const geocode = require('../public/js/utils').geocode;
const weather = require('../public/js/utils').weather;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    name: 'Marky',
    page: 'Home Page'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  if(req.query.address == ""){
    return res.send({
      error: 'Empty Address'
    })
  }

  let address = req.query.address;
  geocode(address, (error, response) => {
    if(error){
      res.send(error)
      return;
    }

    weather(response, (err, wres) => {
      if(err){
        res.send(err)
        return;
      }


      res.send({
        location: address,
        forecast: wres
      });

      // res.render('index', {
      //   location: address,
      //   forecast: wres
      // })
    });
  })


})

app.get('*', (req, res) => {
  res.send('My 404 Page');
})


app.listen(3000, () => {
  console.log("Server listening to server 3000");
});
