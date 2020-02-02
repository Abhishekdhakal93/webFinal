const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({

    posts: { // column name
        type: String   //data type String
    },
    image:{
        type: String
    },
    postdate: { // column name
        type: String   //data type String
    },
    postdetails: { // column name
        type: String  //data type String
    },
})
        
        const Event= mongoose.model('Posts',EventSchema)
    

    module.exports = Post