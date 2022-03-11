const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('please povide password details as argument: node mongo.js <password> <name> <number>');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const uri = 
`mongodb+srv://Josephjoe:${password}@cluster0.0co6e.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(uri);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: name,
    number: number
})

if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook:');
        const list = persons.forEach(person => console.log(person.name, person.number));
        mongoose.connection.close()
    })
}