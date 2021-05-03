function proto_random(){
  
}
//Still improving
function random_but_color() {
var colors = ['#ff0000', '#0384fc', '#fc6b03','#bafc03'];
div = document.getElementById("QuestionsDiv");
label_list=div.querySelectorAll(".colbut")
console.log(label_list);
var i;
for(i=0; i<= label_list.length-1;i++){
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  console.log(label_list[i]);
  label_list[i].style.color=random_color;
  
}

}
random_but_color()
