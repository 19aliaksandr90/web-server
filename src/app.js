const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather app', name: 'Aliaksandr' });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: `${new Date()}`,
    name: 'Aliaksandr',
    description: 'This app created by node js',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    helpText: `This is help text`,
    name: 'Aliaksandr',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' });
  }
  res.send({ address: req.query.address, location: 'Boston' });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide search term' });
  }

  console.log(req.query.search);
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Aliaksandr',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Aliaksandr',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});
