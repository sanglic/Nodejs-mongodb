const express = require('express');
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

//////Crea Web notes con los datos dados por la base de datos////
router.get('/notes', async (req, res) => {
    //console.log(Data);
    //console.log(Data.find({ 'TS1': '2014-01-01' }));
    //console.log(req.body.startdate);
    //console.log(req.body.enddate);
    //console.log(req.body.SW_i);
    //console.log(req.body.SW_i);
   


    Data.find({}, { _id: 0 } ,function (err, datos){
       if (err) return console.error(err);
        //console.log(datos);
        res.render('notes/res-graphs', { resultado: JSON.stringify(datos) })
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


});

//////redirecciona a la ya creado web CreateGraph/////
/* router.post('/CreateGraph', function (req, res) {

    
   
    res.redirect('/CreateGraph');
    
});
*/




module.exports = router;
