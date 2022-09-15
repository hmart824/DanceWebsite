const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const port = 8000;


//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const contact = mongoose.model('Contacts', contactSchema);


//EXPRESS SPESIFIC STUFF
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//Set the template engine as pug 
app.set('views', path.join(__dirname, 'views'))//Set the views directory

//ENDPOINTS
app.get('/', (req ,res)=>{
    const paras = { };
    res.status(200).render('home.pug'); 
});

app.get('/contact', (req ,res)=>{
    const paras = { };
    res.status(200).render('contact.pug'); 
});


app.post('/contact', (req ,res)=>{
  let myData = new contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database")
  }).catch(()=>{
    res.status(400).send("Item was not saved to the database")
  });
    // res.status(200).render('contact.pug'); 
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
