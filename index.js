const express = require('express');
const morgan = require('morgan');
app = express();

morgan.token('data', (req, res) => {
    if (req.method === 'GET') {
        return res.statusMessage;
    }
})


app.use(express.json());
app.use(morgan('tiny'))

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Get all persons from server
app.get('/api/persons', (req, res) => {
    // Log valuable details of each request using morgan
    res.json(persons);

})


// Get the number of entries from the phonebook
app.get('/info', (req, res) => {
    let datenow = new Date();
    console.log(datenow);
    res.send(`<div><p>Phonebook has info for ${persons.length} people</p> <p>${datenow}</p></div>`)
    res.send()
})


// Get a single resource through it's id
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id == id);
    // Handle if person does not exist
    if (!person) {
        return res.status(404).json({error: `Sorry, person ${id} does not exist`});
    }
    res.json(person);
})

// Enable the deletion of a resource through id
app.delete('api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id != id);
    res.status(204).send(`<h2>Person ${id} has succesfully been deleted</h2>`);
})


// Create a new resource(person)
app.post('api/persons', (req, res) => {
    const name = req.name;
    const number = req.number;

    if (!name || !number) {
        return res.status(404).json({error: 'name or number missing'})
    }

    if (persons.find(p => p.name === name)) {
        return res.status(403).json({error: 'name must be unique'})
    }

    const person = {
        id: Math.random() * 1000000,
        name: name,
        number: number
    }
    persons.concat(person);
    res.json(person);
})


// Set app to listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}`);
})