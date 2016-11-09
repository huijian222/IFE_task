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
    $('right_out').addEventListener('click', function() {
        numberArr.pop();
        render();
    });
    $('getRandNumber').addEventListener('click', function() {
        getRandNumber();
        render();
    });
    $('sort').addEventListener('click', function() {
        sort();
    });
}


function getClickIndex(e) {
    var node = e.target;
    if (node.id == "result") return 0; // 中断你们，破坏流程，毁灭世界
    return [].indexOf.call(node.parentNode.childNodes, node);
}

function divBoxDelted() {
    var divBox = $('number_div');
    divBox.addEventListener('click', function(e) {
        var node = getClickIndex(e);
        numberArr.splice(node, 1);
        render();
    })

}

function $(id) {
    return document.getElementById(id);
}

function sort() {
    var len = numberArr.length,
        i, j = 0,
        delay = 100,
        timer;
    i = len - 1;
    timer = setInterval(function() {
        if (i < 1) {
            clearInterval(timer);
        }
        if (j == i) {
            --i;
            j = 0;
        }
        if (parseInt(numberArr[j]) < parseInt(numberArr[j + 1])) {
            var temp = numberArr[j + 1];
            numberArr[j + 1] = numberArr[j];
            numberArr[j] = temp;
            render();
        }
        ++j;
    }, delay);

}

function render() {
    var str = '';
    for (var t in numberArr) {
        str += "<div class='box' style='height:" + numberArr[t] * 5 + "px'>" + numberArr[t] + "</div>";
    }
    $('number_div').innerHTML = str;
}

function getRandNumber() {
    numberArr = [];
    for (var i = 0; i < 50; i++) {
        numberArr[i] = Math.floor(Math.random() * 91 + 10).toString();
    }
}

function init() {
    initButton();
    divBoxDelted();
}
window.onload = function() {
    init();
}
