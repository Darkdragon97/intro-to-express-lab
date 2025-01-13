const express = require('express')
const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 7 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.get('/hello', (req, res) => {
  res.send(
    `Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
  )
})

app.get('/greetings/:username', (req, res) => {
  const username = req.params.username
  res.send(`Hi how are you doing?, ${username}.`)
})

app.get('/roll/:number', (req, res) => {
  const number = req.params.number
  if (isNaN(number)) {
    return res.send('You must specify a number.')
  }
  const max = parseInt(number, 10)
  const randomRoll = Math.floor(Math.random() * (max + 1))
  res.send(`You rolled a ${randomRoll}.`)
})

app.get('/collectibles/:index', (req, res) => {
  const index = req.params.index
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Try again later!')
  }
  const item = collectibles[index]
  res.send(
    `So, you want the ${item.name}? For $${item.price}, it can be yours!`
  )
})

app.get('/shoes', (req, res) => {
  const minPrice = req.query['min-price']
    ? parseFloat(req.query['min-price'])
    : null
  const maxPrice = req.query['max-price']
    ? parseFloat(req.query['max-price'])
    : null
  const type = req.query.type

  let filteredShoes = shoes

  if (minPrice !== null) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice)
  }

  if (maxPrice !== null) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice)
  }

  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    )
  }

  res.json(filteredShoes)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
