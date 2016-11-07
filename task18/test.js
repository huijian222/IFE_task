var numberArr = [];

function initButton() {
    var text = $('text_input');
    $('left_in').addEventListener('click', function() {
        numberArr.unshift(text.value);
        render();
    });
    $('right_in').addEventListener('click', function() {
        numberArr.push(text.value);
        render();
    });
    $('left_out').addEventListener('click', function() {
        numberArr.shift();
        render();
    });
    $('right_in').addEventListener('click', function() {
        numberArr.push();
        render();
    });
}

function divBoxDelted() {
    var divBox = document.getElementsByClassName('box');
    for (var i = 0; i < divBox.length; i++) {
        (function(target) {
            divBox[target].addEventListener('click', function() {
                var index = numberArr.indexOf(divBox[target].innerHTML);
                numberArr.splice(index, 1);
                render();
            });
        })(i);
    }
}

function $(id) {
    return document.getElementById(id);
}

function render() {
    var str = '';
    for (var t in numberArr) {
        str += "<div class='box'>" + numberArr[t] + "</div>";
    }
    $('number_div').innerHTML = str;
    divBoxDelted();

}

function init() {
    initButton();
}
window.onload = function() {
	init();
}