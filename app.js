const express= require('express');
const expressLayouts= require('express-ejs-layouts');
const mongoose=require('mongoose');

const app= express();
const PORT= 5000 || process.env.PORT;


// DB config
const db= require('./config/keys').MongoURI;

// connect to mongo
mongoose.connect(db, {useNewUrlParser:true})
 .then(() => console.log('Mongodb connected.......'))
 .catch( err => console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body parser
app.use(express.urlencoded({extended:false}));

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(PORT ,console.log(`server running on port sucessfully ${PORT}`));
