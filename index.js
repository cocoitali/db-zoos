const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const helmet = require('helmet')

const server = express()

server.use(express.json())

server.use(helmet())

// zoos endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body
  if (zoo.name) {
    db('zoos')
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the zoo into the database.' })
      })
  } else {
    res.status(400).json({ error: 'Please provide a name for the zoo' })
  }
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res.status(500).json({
        error:
          'Information for this table could not be retrieved from the database.'
      })
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to find a zoo with this id in the database.' })
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos').where('id', id).del()
  .then(count => {
    if (count) {
      res.json({ message: "The zoo was successfully deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The zoo with the specified ID does not exist" });
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The zoo could not be removed" });
  });
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  const zoo = req.body
  db('zoos')
    .where('id', id)
    .update(zoo)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to update information for this zoo.' })
    })
})

//bears endpoints here 
server.post('/api/bears', (req, res) => {
  const bear = req.body
  if (bear.name) {
    db('bears')
      .insert(bear)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the bear into the database.' })
      })
  } else {
    res.status(400).json({ error: 'Please provide a name for the bear' })
  }
})

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res.status(500).json({
        error:
          'Information for this table could not be retrieved from the database.'
      })
    })
})

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params
  db('bears')
    .where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to find a bear with this id in the database.' })
    })
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params
  db('bears').where('id', id).del()
  .then(count => {
    if (count) {
      res.json({ message: "The bear was successfully deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The bear with the specified ID does not exist" });
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The bear could not be removed" });
  });
})

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params
  const bear = req.body
  db('bears')
    .where('id', id)
    .update(bear)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to update information for this bear.' })
    })
})

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
