const express = require('express');
app = express();

app.use(express.json());

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


// Set app to listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is currently running on port ${PORT}`);
})