const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({

    eventname: { // column name
        type: String   //data type String
    },
    eventlocation: { // column name
        type: String   //data type String
    },
    eventdetails: { // column name
        type: String  //data type String
    },
    eventimage:{
        type: String
    }  
})
        
        const Event= mongoose.model('Event',EventSchema)
    

    module.exports = Event 
    //User is const name