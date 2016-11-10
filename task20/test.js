var tag = [];

function initButton() {
    $('#add').addEventListener('click', function() {
        tag = $('#textArea').value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
        tag.filter(function(e) {
        	if(e != null && e.length > 0){
        		return true;
        	}
        	else {
        		return false;
        	}
        });
        render();
    });
    $('#inquire').addEventListener('click' ,function() {
    	var serch = $('#inquire_text').value.trim();
    	console.log(serch);
    	render(serch);
    });
}

function initDivDelted() {
    $('#showData').addEventListener('click', function(e) {
        var node = e.target;
        var num = [].indexOf.call(node.parentNode.childNodes, node);
        tag.splice(num, 1);
        render();
    });
}

function $(select) {
    return document.querySelector(select);
}

function render(find) {
    var str = "";
    str = tag.map(function(e) {
    	if(find != null && find.length >0) {
    		e = e.replace(new RegExp(find, "g") , "<span class='select'>" + find + "</span>");
    	}
    	return "<div class='box'>" + e + "</div>";
    });
    $('#showData').innerHTML = str.join('');
}

function init() {
    initButton();
    initDivDelted();
}

window.onload = function() {
    init();
};