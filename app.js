const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const path = require('path');
// const Sendgrid = require('nodemailer-sendgrid');
var router  = express.Router();
// const axios = require('axios');
// const client = require('twilio')('ACe7b8d741e6c966bdde85c12ab45a61bf', '3c2a383bc1be9a61eabf4f8392ec4888');
const cors  = require('cors');
const crypto = require('crypto');
const PORT = process.env.PORT || 4000;
var Client = require('./client.model.js');
var ClientOrder = require('./clientorder.model.js');
var Customer = require('./customers.model.js');
var Sellers = require('./sellers.model.js');
var Seller = require('./seller.model.js');
var SellerOrder = require('./sellerorder.model.js');
var Token = require('./token.model.js');
var SellerToken = require('./sellertoken.model.js');
var Product = require('./products.model.js');
var Place = require('./place.model.js');
// var customername = '';
// var customermail = '';
// var sellername = '';
// var sellermail = '';


var multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
// app.use(methodOverride('_method'));
app.use(flash());
// var passport     = require("passport");
// var localStrategy = require("passport-local");
// var passportLocalMongoose= require("passport-local-mongoose");
var session = require('express-session'); 
mongoose.set('useCreateIndex', true);

var url = "mongodb+srv://venkatitsme6:LaasyaSrihan@portalcluster-rnpcq.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost/foodbe"

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`MongoDB database connection established successfully`);
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'uidjdj89938jdjd',
    resave: true,             
    saveUninitialized: true   
}));
// app.use(passport.initialize()); 
// app.use(passport.session());   
// passport.use(new localStrategy(Client.authenticate()));
// passport.use(new localStrategy(Seller.authenticate()));
 
// passport.serializeUser(Client.serializeUser());
// passport.deserializeUser(Client.deserializeUser());
// passport.serializeUser(Seller.serializeUser());
// passport.deserializeUser(Seller.deserializeUser());

app.use(cors());
app.use('/portal', router);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'venkatitsme6', 
  api_key: '795657622951174', 
  api_secret: 'S9a0MlwRalMVKDxFc6vL_HJgo3E'
});


router.get('/place', (req, res) => {
    console.log(req);
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Client.findOne({email: customermail}, function(err, user) { 
            // console.log('hello');
            // console.log(user);
            Product.find({sellerplace: regex}, function(err, products) {
                console.log('hello');
                console.log(products);

            if (!products) return res.send({msg: 'Unable to find products'});
            Customer.find({}, function(err, customers) {
            console.log(customers);
            // console.log(user);
            // var details = {
            //     customermail: customermail,
            //     sellermail: sellermail
            // }
            res.send({products: products, customers: customers});
        })
}) 
    } else {
        Customer.find({}, function(err, customers) {
            Product.find({}, function(err, product) {
            console.log(customers);
            // console.log(user);
            // var details = {
            //     customermail: customermail,
            //     sellermail: sellermail
            // }
            res.send({products: product, customers: customers});
        })
    // })
    })
    }
})

// app.get('/customerproducts/:id', (req, res) => {
    router.get('/customerproducts', (req, res) => {
    console.log(req);
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Client.findOne({email: customermail}, function(err, user) { 
            // console.log('hello');
            // console.log(user);
            Product.find({name: regex}, function(err, products) {
                console.log('hello');
                console.log(products);

            if (!products) return res.send({msg: 'Unable to find products'});
            Customer.find({}, function(err, customers) {
            console.log(customers);
            // console.log(user);
            // var details = {
            //     customermail: customermail,
            //     sellermail: sellermail
            // }
            res.send({products: products, customers: customers});
        })
}) 
    }
    else { 
    // Client.findOne({email: customermail}, function(err, user) {
        // if (!user) return res.send({msg: 'Unable to find user'});
        Customer.find({}, function(err, customers) {
        Product.find({}, function(err, product) {
        console.log(customers);
        // console.log(user);
        // var details = {
        //     customermail: customermail,
        //     sellermail: sellermail
        // }
        res.send({products: product, customers: customers});
    })
// })
})
    }
})

router.get('/sellerproducts', (req, res) => {
    console.log(req);
    Seller.findOne({email: req.query.sellermail}, function (err, user) {
        if (!user) return res.send({ msg: 'The Seller Id ' + req.body.id + ' is not associated with any Seller account.'});
        console.log(user);
        res.send({products: user.products});
    })
})

router.get('/custorders', (req, res) => {
    ClientOrder.find({clientemail: req.query.customermail}, function(err, orders) {
        console.log(orders);
        res.send({orders: orders});
    })
})

router.post('/rating/:id', (req, res) => {
    console.log(req);
    Product.findOne({_id: req.params.id}, (err, product) => {
        console.log(product);
        product.rating = req.body.rating;
        product.save((err) => {
            if(err) {
                console.log(err);
            }
        });
        res.json({msg: 'Rating Recorded'});
    })
})

router.get('/sellorders', (req, res) => {
    ClientOrder.find({selleremail: req.query.sellermail}, function(err, orders) {
        console.log(orders);
        // var details = {
        //     customername : customername,
        //     customermail : customermail,
        //     sellername : sellername,
        //     sellermail : sellermail
        //  }
        res.send({orders: orders});
    })
})



router.post('/selleredit/:id2', upload.single('file'), (req, res) => {

    console.log(req.params);
    Seller.findOne({email: req.body.sellermail},function (err, user) {
         cloudinary.v2.uploader.destroy(user.pictureId);
            console.log(req.file);
         cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
                var imageId = result.public_id;
                var image = result.secure_url;
                console.log(image);
                console.log(imageId);
        if (!user) return res.send({ msg: 'The Seller Id ' + req.body.id + ' is not associated with any Seller account.'});
        
        var index = user.products.findIndex((product) => {
            return product._id == req.params.id2;
        })
        user.products[index].name = req.body.name,
        user.products[index].description = req.body.description,
        user.products[index].price = req.body.price,
        user.products[index].picture = image,
        user.products[index].pictureId = imageId,
        user.products[index].quantity = req.body.quantity,
        user.products[index].discount = req.body.discount
        user.save();
    Client.find({}, function(err, clients) {
        clients.forEach((client) => {
            var clientindex = client.products.findIndex((product) => {
                return product._id == req.params.id2;
            })  
            // console.log(clientindex);
            // console.log(client.products[0]);
            

            client.products[clientindex].name = req.body.name,
            client.products[clientindex].description = req.body.description,
            client.products[clientindex].price = req.body.price,
            client.products[clientindex].picture = image,
            client.products[clientindex].pictureId = imageId,
            client.products[clientindex].quantity = req.body.quantity,
            client.products[clientindex].discount = req.body.discount
            client.save();
        });
          
    Product.find({_id: req.params.id2}, (err, product) => {
        var productn = product;

        productn.name = req.body.name,
        productn.description = req.body.description,
        productn.price = req.body.price,
        productn.picture = image,
        productn.pictureId = imageId,
        productn.quantity = req.body.quantity,
        productn.discount = req.body.discount

        Product.findOneAndUpdate({_id: req.params.id2}, productn, (err, updatedone) => {
           console.log('Product is Updated');
           console.log(updatedone);

        })
        // product.save();
    })
}); 
    })
    })
})

router.post('/selleraddproduct', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.files);
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err) {
            console.log(err);
        }
        // add cloudinary url for the image to the campground object under image property
        let picture = result.secure_url;
        let pictureId = result.public_id;
    Seller.findOne({email: req.body.sellermail}, function(err, user) {
        console.log(req);
        console.log(user);
        if (!user) return res.send({ msg: 'The Seller Id ' + req.body.id + ' is not associated with any Seller account.'});
        var product = new Product({
            _userId: user._id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            picture: picture,
            pictureId: pictureId,
            quantity: req.body.quantity,
            sellerplace: user.place,
            sellername: user.username,
            sellermail: user.email,
            sellerphone: user.phone,
            sellerimage: user.image,
            viewcount: 0,
            checkoutcount: 0,
            boughtcount: 0,
            discount: req.body.discount,
            rating: 0
        })
        console.log(product);
        product.save((err) => {
            if (err) { return res.status(500).send({ msg: err.message }); }
        console.log(product);
        user.products.push(product);
        user.save((err) => {
            if (err) { return res.status(500).send({ msg: err.message })}
            })
        Client.find({}, function (err, users){
            if(!users) {
               console.log('No Customers are there in database');
            }
            // var usersdata = [...users];
            users.forEach((cust) => {
                cust.products.push(product);
                // Here add gmail and whatsapp notifications to be sent to all users
                client.messages.create({
                        from: 'whatsapp:+14155238886',
                        body: 'Hello ' +  ' \n\nDonator' + req.body.sellermail + 'added a new Item in the website'
                    })
                    .then((message) => console.log(message));
                //   })
                cust.save((err) => {
                    if(err) { return res.status(500).send({ msg: err.message }) }
                })
            });
            console.log(users);
        })
        // console.log(user);
        res.send({seller: user});
        })
    });
    })
})

router.post('/checkout/:id', function(req, res) {
   Client.find({email: req.body.clientemail}, (err, user) => {

       Product.findOne({name: req.params.id}, function(err, product) {

       product.boughtcount = product.boughtcount + 1;

       product.save();
       
       var clientorder = new ClientOrder({
                            name: req.body.product.name,
                            productid: product._id,
                            price: req.body.product.price,
                            picture: req.body.product.picture,
                            quantity: req.body.product.quantity,
                            discount: req.body.product.discount,
                            clientemail: req.body.clientemail,
                            clientphone: req.body.clientphone,
                            selleremail: req.body.selleremail,
                            sellerphone: req.body.sellerphone
                          })
       console.log(clientorder);
       clientorder.save((err) => {
       if (err) { 
           console.log(err);
           return res.status(500).send({ msg: err.message }); 
        }
       });
       console.log(clientorder);
    //    user.orders.push(clientorder);
    //    user.save((err) => {
        
    //     if (err) { 
    //         console.log(err);
    //         return res.status(500).send({ msg: err.message })
    //     }
    //     })
   })

   Seller.find({email: req.body.selleremail}, (err, user) => {
    var sellerorder = new SellerOrder({
                       name: req.body.product.name,
                       price: req.body.product.price,
                       picture: req.body.product.picture,
                       quantity: req.body.product.quantity,
                       discount: req.body.product.discount,
                       clientemail: req.body.clientemail,
                       clientphone: req.body.clientphone,
                       selleremail: req.body.selleremail,
                       sellerphone: req.body.sellerphone
                   })
    console.log(sellerorder);
    sellerorder.save((err) => {
      if (err) { return res.status(500).send({ msg: err.message }); }
        });
    console.log(sellerorder);
    // user.orders.push(sellerorder);
    // user.save((err) => {
    //  if (err) { return res.status(500).send({ msg: err.message })}
    //  })
})

   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'rockinsal6@gmail.com',
           pass: 'Laasyasrihan'
       }
   }); 
   var mailOptions = { from: 'rockinsal6@gmail.com', to:req.body.clientemail, subject: 'Your Order Details', text: 'Hello' + ',\n\n' + ' You have Ordered ' + req.body.product.name };
   transporter.sendMail(mailOptions, function (err) {
     if (err) { return res.status(500).send({ msg: err.message }); }
     res.status(200).send('An email has been sent to customer with order details' + req.body.clientemail + '.');
});
var sellermailOptions = { from: 'rockinsal6@gmail.com', to:req.body.selleremail, subject: 'Customer Order Details', text: 'Hello,\n\n' + ' Customer from ' + req.body.clientaddress + ' Ordered ' + req.body.product.name + '\n\n Customer Contact no is' + req.body.clientphone };
   transporter.sendMail(sellermailOptions, function (err) {
     if (err) { return res.status(500).send({ msg: err.message }); }
     res.status(200).send('An email has been sent to seller with mail id' + req.body.selleremail + '.');
});
// client.messages.create({
//     from: 'whatsapp:+14155238886',
//     body: 'Hello ' + customername + ',' + ' \n\nYou have Ordered ' + req.body.product.name + ' with the price ' + req.body.product.price + '₹' + ' and the discount is ' + req.body.product.discount + '₹' + '\n\nYour Order will be delivered within 3-5 business days, Please Carry the cash with you.' + 'Details:' + '\nSeller mail:' + req.body.selleremail,
//     to: "whatsapp:+91" + req.body.clientphone
// })
// .then((message) => console.log(message));
// })
});
})

router.get('/sellerproduct/:id2', function(req, res) {
    Seller.findOne({email: req.query.sellermail}, function(err, user) {
        if (!user) return res.send({ msg: 'The Seller Id ' + req.body.id + ' is not associated with any Seller account.'});
        var product = user.products.filter((product) => {
            console.log(product._id);
            console.log(req.params.id2);
            return product._id == req.params.id2;
        })
    
        // console.log(clientdetails);
        if(!product) {
            res.send({err: 'Unable to find the product with that product Id'});
        }
        res.send({sproduct: product});
        })
      })

router.get('/customerproductone/:id', (req, res) => {
    Product.find({_id: req.params.id}, function(err, product) {
        Product.find({name: req.params.id}, function(err, product) {
        console.log(product);
        var viewcount = product[0].viewcount + 1;
        console.log(viewcount);
        product[0].viewcount = viewcount;
        product[0].save();
        console.log(product[0]);
        // var details = {
        //     customername: customername,
        //     customermail: customermail,
        //     sellername: sellername,
        //     sellermail: sellermail
        // }
        res.send({product: product});
    })
})
})

router.get('/customerproduct/:id2', function(req, res) {
    Client.findOne({email: req.query.customermail}, function(err, user) {
        console.log(user);
        if (!user) return res.send({msg: 'Unable to find user'});
        var product = user.products.filter((product) => {
            console.log(product._id);
            console.log(req.params.id2);
            return product._id == req.params.id2;
        })
    
        Product.findOne({_id: req.params.id2}, function(err, sellerproduct) {

        Product.findOne({name: req.params.id2}, function(err, sellerproduct) {
        // console.log(sellerproduct);
        sellerproduct.checkoutcount = sellerproduct.checkoutcount + 1;
        sellerproduct.save();
        Seller.findOne({_id: sellerproduct._userId}, function(err, seller) {
        console.log(seller);

        // console.log(user);
        var clientdetails = {
            clientphone: user.phone,
            clientpassword: user.password,
            clientmail: user.email,
            sellerphone: seller.phone,
            sellermail: seller.email
        }
        // var details = {
        //     customername: customername,
        //     customermail: customermail,
        //     sellername: sellername,
        //     sellermail: sellermail
        // }
        console.log(clientdetails);
        if(!product) {
            res.send({err: 'Unable to find the product with that product Id'});
        }
        res.send({sproduct: sellerproduct, clientsellerdetail: clientdetails});
        })
      })
    })
    })
})

router.post('/custlogin', function(req, res, next) {
    // console.log(req);
    Client.findOne({ email: req.body.email }, function(err, user) {
        if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});
        // console.log(user);
        // user.comparePassword(req.body.password, function (err, isMatch) {
            // if(user.username !== req.body.username) return res.status(401).send({ msg: 'Invalid username'});
            if(user.password !== req.body.password) return res.status(401).send({ msg: 'password' });
 
            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
 
            // Login successful, write token, and send back user
            // res.send({ token: generateToken(user), user: user.toJSON() });
            console.log('user logged in');
            var logged_in_data = {
                customername: req.body.username,
                customerpassword: req.body.password,
                customerplace: user.place,
                customermail: req.body.email,
                customerid: user._id,
                sellername: '',
                sellermail: '',
                sellerid: ''
            }
            // customername = req.body.username;
            // customermail = req.body.email;
            // sellername = '';
            // sellermail = '';
            res.locals.loggers = logged_in_data;
            console.log(res.locals);
            // res.send({user: user.toJSON() });
            res.send({loggers: res.locals.loggers});
            // res.redirect('http://localhost:4000/customerproducts');
        // });
    });
})


router.post('/custregister', upload.single('file'), function(req, res, next) {
    // Make sure this account doesn't already exist
    // console.log(req);
    Client.findOne({ email: req.body.email }, function (err, user) {
        console.log(user);
      // Make sure user doesn't already exist
      if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    });

        console.log(req.file);
        console.log(req.files);
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err) {
            console.log(err);
        }
        // add cloudinary url for the image to the campground object under image property
        let picture = result.secure_url;
        let pictureId = result.public_id;

      // Create and save the user
     
     Client.create({ username: req.body.username, email: req.body.email, phone: req.body.phone, image: picture, imageId: pictureId, place: req.body.place, password: req.body.password }, function(err, client) {
          if (err) { 
              console.log(err);
              return res.status(500).send({ msg: err.message }); 
            }
          console.log(client);

          // Create a verification token for this user
          var token = new Token({ _userId: client._id, token: crypto.randomBytes(16).toString('hex') });
   
          // Save the verification token
          token.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              // Send the email
            //   var transporter = nodemailer.createTransport(Sendgrid({
            //       apiKey: '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'
            //   }));
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'rockinsal6@gmail.com',
                       pass: 'Laasyasrihan'
                   }
               }); 
              
              var mailOptions = { from: 'rockinsal6@gmail.com', to: client.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
              transporter.sendMail(mailOptions, function (err) {
                  if (err) { return res.status(500).send({ msg: err.message }); }
                  console.log('Verifying');
                });
                res.status(200).send('A verification email has been sent to ' + client.email + '.');
              });
            });
        });
    });

router.post('/selllogin', function(req, res, next) {
    // console.log(req);
    Seller.findOne({ email: req.body.email }, function(err, user) {
        if (!user) return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});
        // console.log(user);
        // user.comparePassword(req.body.password, function (err, isMatch) {
            if(user.password !== req.body.password) return res.status(401).send({ msg: 'password' });
 
            // if(user.username !== req.body.username) return res.status(401).send({msg: 'Invalid username'});
            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
 
            // Login successful, write token, and send back user
            // res.send({ token: generateToken(user), user: user.toJSON() });
            console.log('user logged in');
            var logged_in_data = {
                customername: '',
                customermail: '',
                customerid: '',
                sellername: req.body.username,
                sellermail: req.body.email,
                sellerid: user._id
            }
            // customername = '';
            // customermail = '';
            // sellername = req.body.username;
            // sellermail = req.body.email;

            res.locals.loggers = logged_in_data;
            console.log(res.locals);
            res.send({loggers: res.locals.loggers });
        // });
    });
});

router.post('/sellregister', upload.single('file'), (req, res) => {
    // Make sure this account doesn't already exist
    Seller.findOne({ email: req.body.email }, function (err, user) {
   
        // Make sure user doesn't already exist
        if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
        console.log(req.file);
        console.log(req.files);
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err) {
            console.log(err);
        }
        // add cloudinary url for the image to the campground object under image property
        let picture = result.secure_url;
        let pictureId = result.public_id;
        console.log(req);
        // Create and save the user
        var user = new Seller({ username: req.body.username, email: req.body.email, password: req.body.password, phone: req.body.phone, image: picture , imageId: pictureId, place: req.body.place });
        console.log(user);
        user.save(function (err) {
            console.log(err);
            if (err) { return res.status(500).send({ msg: err.message }); }
     
            // Create a verification token for this user
            var token = new SellerToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
     
            // Save the verification token
            token.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
     
                // Send the email
                // var transporter = nodemailer.createTransport(Sendgrid({
                //     apiKey: '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'
                // }));
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                           user: 'rockinsal6@gmail.com',
                           pass: 'Laasyasrihan'
                       }
                   }); 
                var mailOptions = { from: 'rockinsal6@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + req.headers.host + '\/sellerconfirmation\/' + token.token + '.\n' };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    console.log('Verifying');
                    res.status(200).send('A verification email has been sent to ' + user.email + '.');
                });
            });
        });
    });
      });
});

// // Confirmation Get
// app.get('/confirmation/:token', function(req, res) {
//     // console.log(req.params.token);
//     res.render('./views/confirmation.ejs', {token: req.params.token});
// })

// Confirmation Seller Get
// app.get('/sellerconfirmation/:token', function(req, res) {
//     // console.log(req.params.token);
//     res.render('./views/sellerconfirmation.ejs', {token: req.params.token});
// })

// Confirmation Post
router.post('/confirmation/:token', function (req, res) {
    console.log(req);
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        // console.log(token);
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        Client.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                Customer.create({username: user.username,email: user.email, image: user.image,place: user.place}, (err, customer) => {
                //   if(err) return res.status(400).send({ msg: 'Unable to create customer' });
                  console.log(customer);
                })
                res.json({msg: 'Verified'});
            });
        });
    });
}
);

// SellerConfirmation Post
router.post('/sellerconfirmation/:token', function (req, res) {
    console.log(req);
    // Find a matching token
    SellerToken.findOne({ token: req.params.token }, function (err, token) {
        // console.log(token);
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        Seller.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                Sellers.create({username: user.username,email: user.email, image: user.image,place: user.place}, (err, sellerone) => {
                    //   if(err) return res.status(400).send({ msg: 'Unable to create customer' });
                      console.log(sellerone);
                    })
                // res.status(200).send("The account has been verified. Please log in.");
                res.json({msg: 'Verified'});
            });
        });
    });
}
);

//Resend get
router.get('/resend', function (req, res) {
    res.render('resend.ejs');
})

//SellerResend get
router.get('/sellerresend', function (req, res) {
    res.render('sellerresend.ejs');
})

//Resend post
router.post('/resend', function (req, res) {
    Client.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            // var transporter = nodemailer.createTransport(Sendgrid({
            //     apiKey: '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'
            // }));
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'rockinsal6@gmail.com',
                       pass: 'Laasyasrihan'
                   }
               }); 
            var mailOptions = { from: 'rockinsal6@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
}
);

//SellerResend post
router.post('/sellerresend', function (req, res) {
    Seller.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new SellerToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            // var transporter = nodemailer.createTransport(Sendgrid({
            //     apiKey: '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'
            // }));
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'rockinsal6@gmail.com',
                       pass: 'Laasyasrihan'
                   }
               }); 
            var mailOptions = { from: 'rockinsal6@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
}
);

// Forgot get
// app.get('/forgot', function(req, res) {
//     res.render('forgot.ejs');
// });

// SellerForgot get
router.get('/sellerforgot', function(req, res) {
    res.render('sellerforgot.ejs');
});

//Forgot post
router.post('/forgot', function (req, res) {
    Client.findOne({ email: req.body.email }, function (err, user) {
        console.log(req);
        if (!user) {
            // req.flash('error', 'No account with that email address exists.');
            // return res.redirect('http://localhost:3000/CustForgot');
            return res.send({error: 'no account with that email addresss'});
            // res.json({error: 'no account with that email addresss'});
        }
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            // var transporter = nodemailer.createTransport(Sendgrid({
            //     apiKey: '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'
            // }));
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'rockinsal6@gmail.com',
                       pass: 'Laasyasrihan'
                   }
               }); 
            var mailOptions = { from: 'rockinsal6@gmail.com', to: user.email, subject: 'Password Reset', text: 'Hello,\n\n' + 'Please click this link to reset the password: \nhttp:\/\/' + req.headers.host + '\/reset\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    // res.redirect('/reset');
                    // res.redirect('http://localhost:3000/CustForgot');
                    res.status(401).send('A Password reset has not been sent to ' + user.email + '.');
                 }
                var details = {
                    customername : customername,
                    customermail : customermail,
                    sellername : sellername,
                    sellermail : sellermail
                }
                res.status(200).send('A Password reset has been sent to ' + user.email + '.');
                res.send({name: user.email, details: details});
            });
        });
 
    });
}
);

//SellerForgot post
router.post('/sellerforgot', function (req, res) {
    Seller.findOne({ email: req.body.email }, function (err, user) {
        console.log(req);
        if (!user) {
            // req.flash('error', 'No account with that email address exists.');
            // return res.redirect('http://localhost:3000/CustForgot');
            return res.send({error: 'no account with that email addresss'});
            // res.json({error: 'no account with that email addresss'});
        }
 
        // Create a verification token, save it, and send email
        var token = new SellerToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            // var transporter = nodemailer.createTransport(Sendgrid({
            //     apiKey: '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'
            // }));
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'rockinsal6@gmail.com',
                       pass: 'Laasyasrihan'
                   }
               }); 
            var mailOptions = { from: 'rockinsal6@gmail.com', to: user.email, subject: 'Password Reset', text: 'Hello,\n\n' + 'Please click this link to reset the password: \nhttp:\/\/' + req.headers.host + '\/sellerreset\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    res.status(401).send('A Password reset has not been sent to ' + user.email + '.');
                 }
                 var details = {
                    customername : customername,
                    customermail : customermail,
                    sellername : sellername,
                    sellermail : sellermail
                }
                res.status(200).send('A Password reset has been sent to ' + user.email + '.');
                res.send({name: user.email, details: details});
            });
        });
 
    });
}
);

// Reset
router.get('/reset/:token', function(req, res) {
    res.render('reset.ejs', {token: req.params.token});
});

//SellerReset
router.get('/sellerreset/:token', function(req, res) {
    res.render('sellerreset.ejs', {token: req.params.token});
});

//Reset post
router.post('/reset/:token', function (req, res) {
    console.log(req);
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        // console.log(token);
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        Client.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
 
            // Verify and save the user
            user.password = req.body.password;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                // res.status(200).send("The account has been verified. Please log in.");
                res.redirect('/');
            });
        });
    });
})

//SellerReset post
router.post('/sellerreset/:token', function (req, res) {
    console.log(req);
    // Find a matching token
    SellerToken.findOne({ token: req.params.token }, function (err, token) {
        // console.log(token);
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        Seller.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
 
            // Verify and save the user
            user.password = req.body.password;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                // res.status(200).send("The account has been verified. Please log in.");
                res.redirect('/');
            });
        });
    });
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/logindetails', (req, res) => {
    Customer.find({}, (err, customers) => {
    res.send ({customers: customers});
})
})

router.get('/sellerlogindetails', (req, res) => {
    Sellers.find({}, (err, sellers) => {
        res.send({sellers: sellers});
    })
})

app.listen(PORT, function() {
    console.log('SERVER STARTED', + PORT);
});