const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');
const path = require("path");
const db = require('./db')
const employeeRouter = require('./routes/emp-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', function(callback){
    console.log("connection succeeded");
})
app.use(express.static(path.join(__dirname,'./public')));
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
  });


//app.use('/api', employeeRouter)
app.post('/employee', function(req, res) {
    
    const name = req.body.name
    const surname = req.body.surname
    const age = req.body.age
    const position=req.body.position
    const gender = req.body.gender
    const tel = req.body.tel
    const email =req.body.email
    const date = req.body.date
    const url = req.body.url
    const city = req.body.city
    const openKey = req.body.openKey
    const description = req.body.description
    const password = req.body.password
    const color = req.body.color
    const maritialStatus = req.body.maritialStatus
     const data = {
        "name": name,
        "surname": surname,
        "age": age,
        "position": position,
        "gender": gender,
        "tel": tel,
        "email": email,
        "date": date,
        "url": url,
        "city": city, 
        "openKey": openKey,
        "description": description,
        "password": password,
        "color": color,
        "maritialStatus": maritialStatus
     }
     db.collection('employees').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    })
    return res.redirect('/index.html')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
