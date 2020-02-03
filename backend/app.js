const express = require('express');
const cors = require('cors');
const fs= require('fs')
const bodyParser = require('body-parser');
const auth = require('./middleware/auth') 
const mongoose = require('./db/mongoose')
const multer = require('multer')
const path= require('path')
const app = express(); 

app.use(cors());
app.use(express.static(path.join(__dirname,'destinationimage')))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const User = require('./model/User');
// const Booking = require('./model/Booking');
const Destination = require('./model/Destination');
 const Event = require('./model/Event');
 const Posts = require('./model/Posts')


const middleware = require('./middleware/middleware');
 require('./db/mongoose');
app.get("/test11", middleware, function(req, res){
    console.log("this should load after the middleware");
   
    })

app.use(bodyParser.urlencoded({ extended: false }));
// register api
app.post('/register', (req, res) => {
    console.log(req.body);
    data={
        'image': req.body.image,
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'confirm_password': req.body.confirm_password,
        'usertype':"user"
    }
    var mydata = new User(data);

    mydata.save().then(function (data) {
        //alert(Success)
              res.send(data);
      }).catch(function (e) {
            res.send(e);
          });
  });

  // Login Api
  app.post("/login", async function(req, res){
    const user = await User.checkCrediantialsDb(req.body.username,req.body.password)
    const token = await user.generateAuthToken()
    console.log(token)
    res.send({token:token,
        userdata:user})
   })

app.get('/users', function (req, res) {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});
app.delete('/userdelete/:id',function(req,res){
    uid=req.params.id.toString();
    User.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })



   //dashboard tokens client file
   app.get('/user/me',function(req,res)
   {  
       res.send(req.user);
   })
   

app.post('/users/logout', auth, async (req, res) => {
    try {
        console.log( req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token
    })
    await req.user.save()
    res.send()
    } catch (e) {
    res.status(500).send()
    }
   })
   app.post('/users/logoutAll', auth, async (req, res) => {
    try {
    req.user.tokens = []
    await req.user.save()
    res.send()
    } catch (e) {
    res.status(500).send()
    }
   }) 

   var storage = multer.diskStorage({
    destination: 'img',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'User' + Date.now() + ext);
    }
});
var storage = multer.diskStorage({
    destination: 'destinationimage',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, 'Destination' + Date.now() + ext);
    }
});


var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};  

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});


    app.post('/image', upload.single('imageFile'), (req, res) => {
       res.send(req.file)
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(req.file);
    });
    app.post('/destinationimage', upload.single('imageFile'), (req, res) => {
        res.send(req.file)
         // res.statusCode = 200;
         // res.setHeader('Content-Type', 'application/json');
         // res.json(req.file);x    
     });
     
    
    
    

   app.put('/updateprofile',auth, function (req, res) {   //update producte
    console.log(req.body);
    User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
      res.send("succesfull");
    });
  });
  
  app.put('/updatevenue', function (req, res) {   //update producte
    console.log(req.body);
    Venue.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, venue) => {
      res.send("succesfull");
    });
  });
  

  app.delete('/userdelete/:id',function(req,res){
    uid=req.params.id.toString();
    Destination.findByIdAndDelete(uid).then(function(){
        res.send({message:"success"})
    })
  })




app.post('/adddestination', (req,res) => {
    console.log(req.body);
    var mydata = new Destination(req.body);
    mydata.save().then(function (data){
        console.log('sadasd');
        res.send(data);
    }).catch(function (e) {
        res.send(e);
    });
    });
    
    app.get('/adddestination', function (req, res) {
        Destination.find().then(function (destination) {
            res.send(destination);
        }).catch(function (e) {
            res.send(e)
        });
    });

    // hike event
    app.post('/eventadd', (req,res) => {
      console.log(req.body);
      var mydata = new Event(req.body   );
      mydata.save().then(function (data){
          console.log('sadasd');
          res.send(data);
      }).catch(function (e) {
          res.send(e);
      });
      });
    app.get('/eventadd', function (req, res) {
      Event.find().then(function (event) {
          res.send(event);
      }).catch(function (e) {
          res.send(e)
      });
  });
  
  // =======================

      // hike post
      app.post('/postadd', (req,res) => {
        console.log(req.body);
        var mydata = new Posts(req.body   );
        mydata.save().then(function (data){
            console.log('sadasd');
            res.send(data);
        }).catch(function (e) {
            res.send(e);
        });
        });
      app.get('/postadd', function (req, res) {
        Event.find().then(function (event) {
            res.send(event);
        }).catch(function (e) {
            res.send(e)
        });
    });


    //==================================================

    app.delete('/venuedelete/:id',function(req,res){
        uid=req.params.id.toString();
        Venue.findByIdAndDelete(uid).then(function(){
            res.send({message:"success"})
        })
      })
      app.get('/adddestination/:id', function (req, res) {
        uid=req.params.id.toString();
        Venue.findById(uid).then(function (venue) {
    
            res.send(venue);
        }).catch(function (e) {
            res.send(e)
        });
    
    });
    
    app.post('/bookvenue/:id', auth, function (req, res) {
        console.log("venue reserved")
        
        uid = req.params.id.toString();
        console.log(uid);
        
        const bookv = new Booking({ vid: uid, status: "Booked", uid: req.user._id });
        bookv.save().then(function () {
          res.send('fine');
        })
      })
      //------------------Booking status admin---------------------//
app.get('/bookedvenue', function (req, res) 
{
    Booking.find()
      .populate('vid')
      .populate('uid')
      .exec()
      .then(function (docs) {
        if (docs) {
  
          res.send({
            orders: docs.map(doc => {
              return {
                _id: doc._id,
                vid: doc.vid,
                status: doc.status,
                uid: doc.uid
  
              }
            })
          })
        }
  
      })


  });
  app.get('/venuestatus', auth, function (req, res) {
      console.log(req.user._id)
  
    Booking.find({uid: req.user._id})
      .populate('vid')
      .populate('uid')
      .exec()
      .then(function (venuedash) {
        if (venuedash) {
  console.log(venuedash);
          res.send({
            orders: venuedash.map(doc => {
              return {
                _id: doc._id,
                vid: doc.vid,
                status: doc.status,
                uid: doc.uid
  
              }
            })
          })
        }
    })
});
app.delete('/venuestatusdelete/:id',function(req,res){
  uid=req.params.id.toString();
  Booking.findByIdAndDelete(uid).then(function(){
      res.send({message:"success"})
  })
})

// For adding venueevents
app.post('/venueeventadd', (req,res) => {
  console.log(req.body);
  var mydata = new Venueevent(req.body);
  mydata.save().then(function (data){
      res.send(data);
  }).catch(function (e) {
      res.send(e);
  });
  });

app.listen(9000);
console.log('server in 9000')