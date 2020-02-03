const mongoose = require('mongoose');
const PostsSchema = new mongoose.Schema({

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
        
        const Posts= mongoose.model('Posts',PostsSchema)
    

    module.exports = Posts