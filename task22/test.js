var flag = 0;
function $(select) {
    return document.querySelector(select);
}
function initButtom() {
    $('#pre').addEventListener('click' , function () {
        var node = $('#tree');
        preOrder()(node);
    });
    $('#mid').addEventListener('click' , function () {
        var node = $('#tree');
        midOrder()(node);
    });
    $('#last').addEventListener('click' , function () {
        var node = $('#tree');
        lastOrder()(node);
    });
}
function render(node) {
    node.style.background = "pink";
    setTimeout(function () {
        node.style.background = "white";
    },500);
}
function preOrder() {
    var stack = [];
    var func;
    func = function fn(root) {
        flag += 1;
        console.log(flag);
        if(root == null) {
            return;
        }
        stack.push(function () {
            render(root);
        })
        console.log(stack);
        fn(root.firstElementChild);
        console.log(stack);

        fn(root.lastElementChild);

    };
    return function (root) {
        func(root);
        var timer = setInterval(function () {
            if(stack.length === 0) {
                clearInterval(timer);
                return;
            }
            stack.shift()(root);
        },500);
    }
}
function midOrder() {
    var stack = [];
    var func;
    func = function fn(root) {
        if(root == null) {
            return;
        }
        console.log(stack);
        fn(root.firstElementChild);
        stack.push(function () {
            render(root);
        });

        fn(root.lastElementChild);
    };
    return function (root) {
        func(root);
        //console.log(stack);
        var timer = setInterval(function () {
            if(stack.length == 0) {
                clearInterval(timer);
                return;
            }
            stack.shift()(root);
        },500);
    }
}
function lastOrder() {
    var stack = [];
    var func;
    func = function fn(root) {
        if(root == null) {
            return;
        }
        console.log(stack);
        fn(root.firstElementChild);
        fn(root.lastElementChild);
        stack.push(function () {
            render(root);
        });


    };
    return function (root) {
        func(root);
        //console.log(stack);
        var timer = setInterval(function () {
            if(stack.length == 0) {
                clearInterval(timer);
                return;
            }
            stack.shift()(root);
        },500);
    }
}
function init() {
    initButtom();
}

window.onload = init();
