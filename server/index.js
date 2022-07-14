const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs')
const path = require('path')
const express = require('express');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(express.json());

const VALID_STATUS = ['DONE', 'PENDING', 'REJECTED'];

const file = fs.readFileSync(path.join(__dirname, 'cards.json'));
const cards = JSON.parse(file);

// Add custom routes before JSON Server router
server.get('/cards', (req, res) => {
  res.jsonp(cards)
})

server.post('/cardStatus', (req, res) => {
  const id = req?.body?.id;
  const status = req?.body?.status;
  if (!VALID_STATUS.includes(status)) {
    res.json({ error: `Invalid status ${status}`});
    return;
  }
  for (const card of cards) {
    if (card.id === id) {
      card.status = status;
    }
  }
  res.jsonp(cards);
});

server.use(jsonServer.bodyParser)

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running port 3000')
})