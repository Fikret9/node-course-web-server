const fs      = require('fs');
var content = readFile('Manual Checked-In_March 3 to 9.txt');
var lines = content.toString().split('\n');
var manual = [];

content = readFile('master-barcodes.txt');
var linesmaster = content.toString().split('\n');
var master = [];

linesmaster.forEach((line)=>{
  if (line.length>1) {
    master.push(line);
  }
});

lines.forEach((line)=>{
  if (lines.length > 1){
      var array = line.split(',');
      match(array,1,master,4);
      }
});

printFile(manual,' ' );

 function match(val,matchcolumn, master,returncolumn){
     var matchresult='';
     master.forEach((mline) => {
       if (mline.indexOf(val[matchcolumn])>-1){
          var mlineArray = mline.split('\t');
          matchresult = mlineArray[returncolumn]
                       +','+val[0]
                       +',AM,DB';
          matchresult =  matchresult.replace('/20','/');
          manual.push(matchresult);
        }
     });
 }

function printFile(filename,character){
  filename.forEach((fileline) => {
    console.log(character+'==> '+ fileline);
  });
}
//----------------------------------------
function readFile(filename){
  console.log('filename: '+filename);
  try {
  var filecontent = fs.readFileSync(filename,'utf8');
  }
  catch (e){
    console.log(e);
  }
  return filecontent;
}

function writefile(filename, fileString){
  fs.appendFileSync(filename,fileString);
}
