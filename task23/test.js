var stack = [];
var BFindex = 0;//广度优先遍历自增标识符
function deepTraversal(node) {
    if(node){
        stack.push(node);
        for(var i=0;i<node.children.length;i++) {
            deepTraversal(node.children[i]);
        }
    }
}

function widthTraversal(node) {
    if (node) {
        stack.push(node);
        widthTraversal(node.nextElementSibling);
        node = stack[BFindex++];
        widthTraversal(node.firstElementChild);
    }
}
function deepTraversalSearch(text) {

}
function render() {
    var len = stack.length;
    var i = 0;
    timer = setInterval(function() {
        if(i < len) {
            if(stack[i-1]) {
                stack[i-1].style.background = "white";
            }
            stack[i++].style.background = "pink";
        }
        else {
            stack[i-1].style.background = "white";
            stack = [];
            clearInterval(timer);
        }
    },500);
}
function  initButton() {
    $('#deepTraversal').addEventListener('click' , function () {
        deepTraversal($('#root'));
        render();
    });
    $('#widthTraversal').addEventListener('click' , function () {
        widthTraversal($('#root'));
        //render();
    });
}
function $(select) {
    return document.querySelector(select);
}
function init() {
    initButton();
}
window.onload = init();