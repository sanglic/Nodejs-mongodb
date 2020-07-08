const express = require('express');
const router = express.Router();
var Data = require("../models/Note").Dat




//////Crea Web notes con los datos dados por la base de datos//// Pone el limite de fechas
///PRIMERA VISUALIZACIÓN DE LA PÁGINCA///
router.get('/notes', async (req, res) => {
  

    Data.find({}, { _id: 0 } ,function (err, datos){
        if (err) return console.error(err);
        console.log(datos[1]);
        console.log(datos[datos.length - 1]);
        var Fecha_Start = datos[1].date;
        var Fecha_End = datos[datos.length - 1].date;
        Fecha_Start = convert_fecha(Fecha_Start);
        Fecha_End = convert_fecha(Fecha_End);        
        res.render('notes/res-graphs', { Fecha_Start, Fecha_End });
           });
   
});
////////////////////////////////////////////////////////////

/////conversor de fecha de la base de datos a html//////////
function convert_fecha(Datum) {
    Datum = Datum.charAt(6) + Datum.charAt(7) + Datum.charAt(8) + Datum.charAt(9) + '-' + Datum.charAt(3) + Datum.charAt(4) + '-' + Datum.charAt(0) + Datum.charAt(1);
    return Datum;
}
////////////////////////////////////////////////////////////////


///VISUALIZACIÓN DE LA GRAFICA
router.put('/notes', async (req, res) => {
   



    
    
   


    ///COMPROBAMOS QUE LOS DATOS ESTEN BIEN INTRODUCIDOS/////////
    
    let d1 = new Date(req.body.date1);
    let d2 = new Date(req.body.date2);


    var text;
    const errors =[];

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {  // d.valueOf() could also work
        // date is not valid
        console.log('entra 1')
        errors.push({ text: 'Inserte una fecha' });
    };
    

    if (d1 > d2) {

        errors.push({ text: 'Inserte una fecha valida' });
        var point1 = 1
    } else {
        point1=0
    }
    
    if ((req.body.LW_in_Avg || req.body.LW_out_Avg || req.body.Rnet_Avg || req.body.SW_in_Avg || req.body.SW_out_Avg) != 'on') {
        errors.push({ text: 'Elija al menos un dato para visualizar' });
       
        var point2 = 1
    }
    else {
        point2 = 0
    }
    if ((d1 === undefined) || (d2 === undefined)) {
        errors.push({ text: 'Fecha invalida, faltan datos en ese rango' });
        

        } else {
            point4=0
 
    }
    if (errors.length > 0) {

        Data.find({}, { _id: 0 }, function (err, datos) {
            if (err) return console.error(err);
            console.log(datos[1]);
            console.log(datos[datos.length - 1]);
            var Fecha_Start = datos[1].date;
            var Fecha_End = datos[datos.length - 1].date;
            Fecha_Start = convert_fecha(Fecha_Start);
            Fecha_End = convert_fecha(Fecha_End);
            res.render('notes/res-graphs', { Fecha_Start, Fecha_End, text, errors });
        });
        
        var point3 = 1
    }
    else {
        point3=0
    }
    /////////////////////////////////////////


    //////SI LOS DATOS ESTAN BIEN INTRODUCIDOS
    
    if ((point1 || point2 || point3 || point4) == 0) {

        ///PASAMOS LOS DATOS DE LOS CHECKBOX
        Array_graph = '{"_id": 0,'
        
        if (req.body.LW_in_Avg == 'on') {
            Array_graph = Array_graph + ' "LW_in_Avg": 1,'
            
        }

        if (req.body.LW_out_Avg) {
            Array_graph = Array_graph + ' "LW_out_Avg" :1,'
            
        }

        if (req.body.Rnet_Avg) {
            Array_graph = Array_graph + ' "Rnet_Avg": 1,'
            
        }

        if (req.body.SW_in_Avg) {
            Array_graph = Array_graph + ' "SW_in_Avg":1,'
            
        }

        if (req.body.SW_out_Avg) {
            Array_graph = Array_graph + ' "SW_out_Avg":1,'
            
        }

        Array_graph = Array_graph + ' "Numero_Muestra" : 1,"date": 1}';


        Array_graph = JSON.parse(Array_graph);
   ///////////////////////////////////////////


    //////CONVERTIMOS FECHA////////////////////////////

        function conversor(d) {

            if ((d.getMonth() >= 9) && (d.getDate() > 9)) {
                var x = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            }
            if ((d.getMonth() <= 8) && (d.getDate() <= 9)) {
                var x = "0" + d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
            }
            if ((d.getMonth() >= 9) && (d.getDate() <= 9)) {
                var x = "0" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            }
            if ((d.getMonth() <= 8) && (d.getDate() > 9)) {
                var x = d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
            }
            return x;
        };

        d1_conv = conversor(d1);
        d2_conv = conversor(d2);

        //////////////////////////////////////////
     




        /////Necesitamos Fecha Start y End///////////////////
        Data.find({}, { _id: 0 }, function (err, datos) {
            if (err) return console.error(err);
           
            var Fecha_Start = datos[1].date;
            var Fecha_End = datos[datos.length - 1].date;
           
            Fecha_Start = convert_fecha(Fecha_Start);
            Fecha_End = convert_fecha(Fecha_End);
           



            ////////////////FIND PRIMER VALOR FECHA A TRAVES DE NUMERO DE MUESTRA//////////////////
            Data.find({ 'date': { $regex: d1_conv } }, { _id: 0, 'Numero_Muestra': 1 }).exec(function (error, dat1) {
                var dat_start = dat1[1]
                

                ////////////////FIND SEGUNDO VALOR FECHA A TRAVES DE NUMERO DE MUESTRA//////////////////
                Data.find({ 'date': { $regex: d2_conv } }, { _id: 0, 'Numero_Muestra': 1 }).exec(function (error, dat2) {


                  

                    dat_end = dat2[dat2.length - 1];


                    ////////////////CREAMOS GRAFICA CON LOS VALORES////////////////////
                    Data.find({}, Array_graph).where('Numero_Muestra').gte(dat_start.Numero_Muestra).lte(dat_end.Numero_Muestra).exec(function (err, datos) {
                        //Data.find({}, Array_graph).where('date').gte(form_d1).lte(form_d2).exec(function (err, datos) {
                        //Data.find({ $and: [{ "date": { $lte: form_d1 }}, { "date": { $gte: form_d2 }}] },  Array_graph)/*.where('date').gt(req.body.date1).lt(req.body.date2)*/.exec(function (err, datos) {
                        //Data.find({ date: { $gte: form_d1, $lte: form_d2 } }, Array_graph)/*.where('date').gt(req.body.date1).lt(req.body.date2)*/.exec(function (err, datos) {
                        //Data.find({}, Array_graph)/*.where('date').gt(req.body.date1).lt(req.body.date2)*/.exec(function (err, datos) {
                        console.log(typeof(d1_conv));
                        res.render('notes/res-graphs', {
                            resultado: JSON.stringify(datos), d1_Conv: JSON.stringify(d1_conv), d2_Conv: JSON.stringify(d2_conv), Fecha_Start, Fecha_End, LWinAvg: JSON.stringify(req.body.LW_in_Avg), LWoutAvg: JSON.stringify(req.body.LW_out_Avg),
                            RnetAvg: JSON.stringify(req.body.Rnet_Avg), SWinAvg: JSON.stringify(req.body.SW_in_Avg), SWoutAvg: JSON.stringify(req.body.SW_out_Avg)
                        })
                    });
                    ////////////////////////////////////////////////////////////////////////
                });
                /////////////////////////////////////////////////////////////////////////////
            });
            ////////////////////////////////////////////////////////////////////////////////
        });
    };


});

//////redirecciona a la ya creado web CreateGraph/////
/* router.post('/CreateGraph', function (req, res) {

    
   
    res.redirect('/CreateGraph');
    
});
*/




module.exports = router;
