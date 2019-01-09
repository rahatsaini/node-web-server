const express = require('express');

const hbs= require('hbs');
var app = express();


//port for heroku
const port = process.env.PORT || 3000;


// for registring the partials
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
var fs = require('fs');

    app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =  `${now}: ${req.method}${req.url}`;
    fs.appendFile('server.log',log + '\n');
    console.log(`${now}: ${req.method}${req.url}`);
    next();
    })




    

app.use(express.static(__dirname+'/public'));
hbs.registerHelper('currentYear',()=>
{return new Date().getFullYear();

});


app.get('/',(req,res)=>{ 
    res.render('welcome.hbs',
    {
        pagetitle:'Welcome',
        
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',
    {
    pagetitle:'sometitle',
    currentyear : new Date().getFullYear()
    }
    );
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
} );