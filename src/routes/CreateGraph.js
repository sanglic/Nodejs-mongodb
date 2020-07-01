const express = require('express');
var bodyParser = require('body-parser');
//var app = express();
const router = express.Router();
var Data = require("../models/Note").Dat
//var bodyParser= require("body-parser")

//router.get('/notes/graph', (req, res) => {
//    res.render()
//})
//app.use(bodyParser.json());
//router.post('/notes/new-graph', (req, res) => {

//})

/////////////Crea la web CreateGraph/////////////////////////

router.get('/CreateGraph', async (req, res) => {
    //console.log(Data);
    //console.log(Data.find({ 'TS1': '2014-01-01' }));

    
         //console.log(res)
    
        //res.render('notes/create-graphs')
    
   
    res.render('notes/create-graphs');
    
});

    //   { _id: 0 })


    //var resultado = await Data.find({date:},{ _id: 0 });
    //console.log(resultado);
    //res.render('notes/res-graphs', { resultado });
    //res.render('notes/res-graphs');

    /*Data.find({}, { _id: 0 }).exec(function (err, datos) {
        if (err) return console.error(err);
        console.log(datos);
        res.render('notes/res-graphs', { resultado: datos})

    });*/
    



module.exports = router;
