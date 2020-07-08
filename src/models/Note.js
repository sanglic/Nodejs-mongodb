const mongoose = require('mongoose');
const Schema = require('mongoose');
var FirstSchema = new mongoose.Schema({


			_id: String,
			Numero_Muestra: Number,
			date: String,
			SW_in_Avg: Number,
			SW_Out_Avg: Number,
			LW_in_Avg: Number,
			LW_out_Avg: Number,
			Rnet_Avg: Number
		

});


//var dataSchema = new Schema({}, { collection: 'Majadas_Main' })

//const NoteSchema = new Schema({
	//RH_1m: { type: Number },
	//TS1: { type: String }


//});

var Data = mongoose.model('Radiacion', FirstSchema, 'Radiacion');

module.exports.Dat = Data;