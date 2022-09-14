const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){

    await mongoose.connect('mongodb://localhost:27017/test');

    const kittySchema = new mongoose.Schema({
        name: String
    });

    //const Kitten = mongoose.model('Kitten', kittySchema);

    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.name);


    kittySchema.methods.speka = function speak() {
        const greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

}