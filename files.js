const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const bodyparser = require("body-parser");
var folder = __dirname;
var filename = ' ';
app.use(bodyparser.urlencoded({extended:true}));
hbs.registerHelper("if", function(conditional, options) {
  if (options.hash.desired === options.hash.type) {
    options.fn(this);
  } else {
    options.inverse(this);
  }
});
var fetchFile = () => {
  try {
    var fileString = fs.readFileSync(filename,{ encoding: 'utf8' });
    return (fileString);
  }
  catch (e) {
      console.log(e);
      return [];
  }
}
folder = __dirname ;
app.set('view engine','hbs');
app.get('/',(req,res) =>{
  res.render('homeFiles.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to My File Utility',
    currentYear : new Date().getFullYear()
  });
});

app.post('/',(req,res) =>{
   console.log("REQUEST OBJECT:");
   console.log(req.body);
   dirName = req.body.directoryInput;
   console.log(req.body.directoryInput);
   res.redirect("/dir");
});


app.get('/dir',(req,res) =>{
   filesInDirectory = dirName;
   res.render('dir.hbs',{
     pageTitle: 'Directory Listing',
     welcomeMessage: 'Directory Listing',
     dirname: dirName,
     directory : filesInDirectory
   });
});

app.get('/file',(req,res) =>{
   res.send({
     error: 'Reading File'
   });
});

app.listen(3100, () => {
  console.log('Server is up on port 3100');
});


if (filename) {
  console.log('Filename:' + filename);
  var result = [];
  result = fetchFile();
  console.log(result);
}


var folder = 'C:\\Users\\Fikret\\Desktop'  ;
console.log('Starting directory: '+folder);
var filesInDirectory = [];

function readdirectory
fs.readdir(folder,(err,files) => {
  if(files){
  files.forEach (file => {
    filesInDirectory.push(
    {
      filename: file,
      filetype : (file.indexOf('.')>-1)?'     ':'     Folder'
    });

  //  }
    console.log(">> "+ JSON.stringify(file) );

  });
}
});



var fetchFile = () => {
  try {
    var fileString = fs.readFileSync(filename);
    return JSON.parse(noteString);
  }
  catch (e) {
      console.log(e);
      return [];
  }
}
