const path = require('path')
const express = require('express')
const hbs = require('hbs')

const allergy = require("./utils/allergy")

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Allergies"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About"
  })
})

app.get('/allergies', (req, res) => {
  if (!req.query.given || !req.query.family) {
    return res.send({
      error: 'You must provide a given and family name.'
    })
  }

  allergy(req.query.given, req.query.family, (error, allergyData = []) => {
    if (error) {
      return res.send({ error })
    }
    return res.send({
      allergyData,
      patient: {
        givenName: req.query.given,
        familyName: req.query.family
      }
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
