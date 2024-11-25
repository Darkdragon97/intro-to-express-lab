const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, everyone!')
})

app.listen(3000, () => {
  console.log('EJS App is listening om port 3000')
})

app.get('/greetings/:username', (req, res) => {
  const username = req.params.usernameres.send('Hello there, ${username}!')
})

app.get('/roll:number', (req, res) => {
  const number = parseInt(req.params.number)
  if (isNaN(number)) {
    res.send('You must specify a number.')
  } else {
    const roll = math.floor(Math.random() * (number + 1))
    res.send('You rolled a ${roll}.')
  }
})

const collectible = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'aurographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectible/:index', (req, res) => {
  const index = parseInt(req.params.index)
  if (index < 0 || index >= collectible.length) {
    res.send('This item is not yet in stock. Check bacl soon!')
  } else {
    const item = collectible[index]
    res.send(
      'So, you want the ${item.name}? for ${item.price}, it can be yours!'
    )
  }
})

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

app.get('/shoes', (req, res) => {
  let filterdShoes = shoes

  if (req.query['min-price']) {
    const minPrice = parseFloat(req.query['min-price'])
    filterdShoes = filterdShoes.filter((shoe) => shoe.price >= minPrice)
  }

  if (req.query['max-price']) {
    const maxPrice = parseFloat(req.query['max-price'])
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice)
  }

  if (req.query['type']) {
    const type = req.query['type']
    filterdShoes = filterdShoes.filter((shoe) => shoe.type === type)
  }

  res.json(filterdShoes)
})
