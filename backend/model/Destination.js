const mongoose = require('mongoose');
const DestinationSchema = new mongoose.Schema({

    destinationname: {  
        type: String    
    },
    city: { 
        type: String    
    },
    address: { 
        type: String   
    },
    category: { 
        type: String    
    },
    details:{
        type: String
    },
    destinationimage:{
        type: String
    }  
})
        
        const Destination= mongoose.model('Destination',DestinationSchema)

    module.exports = Destination 
