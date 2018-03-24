const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');
var app       = express();
const bodyparser = require("body-parser");
var folder ;
var filename = ' ';
app.use(bodyparser.urlencoded({extended:true}));

folder = __dirname ;
app.set('view engine','hbs');

app.get('/',(req,res) =>{
  console.log(" i am  here");
  console.log(req.body.directoryInput);
  res.render('homeFiles.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to My File Utility',
    currentYear : new Date().getFullYear()
  });
});


app.post('/',(req,res) =>{
   dirName = req.body.directoryInput;
   res.redirect("/dir");
});

app.get('/dir',(req,res) =>{
  var folder = dirName  ;
  var filesInDirectory = [];
  filesInDirectory = getDirectoryContent(folder);

   res.render('dir.hbs',{
     pageTitle: 'Directory Listing',
     welcomeMessage: 'Directory Listing',
     dirname: dirName,
     directory : filesInDirectory
   });
});

app.get('/dir/:id',(req,res) =>{
  console.log(req.params.id);
  dirName = dirName+'/'+req.params.id.trim();
  dirName.replace('/','\'');
    console.log('Dirname: '+ req.params.id);
  filesInDirectory = getDirectoryContent(dirName);
  res.render('dir.hbs',{
    pageTitle: 'Directory Listing',
    welcomeMessage: 'Directory Listing',
    dirname: dirName,
    directory : filesInDirectory
  });
});


app.post('/dir',(req,res) =>{
   var selectedFilesToCombine = req.body.selectedfiles.split(",");
  for (var i=0;i<selectedFilesToCombine.length;i++){
       var fileElement = selectedFilesToCombine[i].trim();
       var noteString = readFile(dirName+'/'+fileElement);
       if (noteString) {
        writefile(noteString);
       }
       res.redirect("/show");
   }
});

app.get('/show',(req,res) =>{
   var textcontent = readFile('combined.txt');
   if (!textcontent) {
     res.redirect('/dir');
   }
   else
   {
    var content = textcontent.split("\u000A");
    res.render('show',{
     pageTitle: 'Combined file',
     welcomeMessage: 'Combined file',
     content : content
   });
   }
});

app.post('/del',(req,res) =>{
  fs.unlink('combined.txt', function (err) {
   if (err) {
     res.redirect("/dir");
   }
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


function writefile(fileString){
  fs.appendFileSync('combined.txt',fileString);
}


function readFile(filename){
  try {
  var filecontent = fs.readFileSync(filename,'utf8');
  }
  catch (e){
    console.log(e);
  }
  return filecontent;
}

function getDirectoryContent(folder){
  console.log("folder: " + folder);
 var filesInDirectory = [];
 fs.readdir(folder,(err,files) => {
   if(files){
   files.forEach (file => {
     filesInDirectory.push(
     { filename: file,
       filetype : (file.indexOf('.')>-1)?null:'     Folder'
     });
   });
 }
 });
 return filesInDirectory;
}
