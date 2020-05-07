const express= require('express');
const expressLayouts= require('express-ejs-layouts');

const app= express();
const PORT= 5000 || process.env.PORT;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(PORT ,console.log(`server running on port sucessfully ${PORT}`));
