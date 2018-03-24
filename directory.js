var lis = document.querySelectorAll("li");
console.log("lis: "+ lis);
for (i=0;i<lis.length;i++)
 {
  lis[i].addEventListener("mouseover",function(){
    console.log(i + " " + " selected !" );
   this.classList.add("selected");

})

  lis[i].addEventListener("mouseout",function(){
      console.log(i + " " + " out  !" );
   this.classList.remove("selected");
})

  lis[i].addEventListener("click",function(){
  this.classList.toggle("done");
})
}
