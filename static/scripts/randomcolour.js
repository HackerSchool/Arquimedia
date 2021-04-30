alert('Fuck YOUUUUU!')
var colors = ['#ff0000', '#00ff00', '#0000ff'];
var random_color = colors[Math.floor(Math.random() * colors.length)];
for (element in getElementsByClassName("colbut")){
    document.element.style.color = random_color;
    }
$('#colbut').css('color', random_color);
//Still improving
