var tag = [];
var tag_botton = [];
var tagPlaugn = (function() {
    function $(select) {
        return document.querySelector(select);
    }

    function tag(input, ouput, button, type) {
        var num;
        this.input = $(input);
        this.ouput = $(ouput);
        this.button = $(button);
        this.prototype = {
            constructor : tag,
            render : function (value, output) {
                var str = "";
                if (value.length === 0) {
                    $(ouput).innerHTML = '';
                } else {
                    str = value.map(function(e) {
                        return "<div class='box'>" + e + "</div>";
                    });
                    $(output).innerHTML = str.join('');
                }
            },
        };

        this.getData = function() {
            if (type === 'tag') {
                var test = $(input).value.trim();
                if (test == '') {
                    throw ('error');
                }
                var re = /[0-9a-zA-Z\u4e00-\u9fa5]+/;
                test = re.exec(test);
                if (unqiue(test, tag, true)) {
                    if (tag.length < 10) {
                        tag.push(test);
                    } else {
                        tag.shift();
                        tag.push(test);
                    }
                }
            }

        }
    }
})

function initButton() {
    $('#add').addEventListener('click', function() {
        var text = $('#tag_text').value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
        for (var i = 0, len = text.length; i < len; i++) {
            if (unqiue(text[i], tag_botton)) {
                if (tag_botton.length < 10) {
                    tag_botton.push(text[i]);
                } else {
                    tag_botton.shift();
                    tag_botton.push(text[i]);
                }
            }
        }
        render(tag_botton, 'showBottomData');
    });
    $('#textArea').addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            var test = $('#textArea').value.trim();
            if (test == '') {
                throw ('error');
            }
            var re = /[0-9a-zA-Z\u4e00-\u9fa5]+/;
            test = re.exec(test);
            if (unqiue(test, tag, true)) {
                if (tag.length < 10) {
                    tag.push(test);
                } else {
                    tag.shift();
                    tag.push(test);
                }
            }
            tag.filter(function(e) {
                if (e != null && e.length > 0) {
                    return true;
                } else {
                    return false;
                }
            });
            render(tag, 'showData');
        }
    });
}

function initDivDelted(divBoxId, arr, postion = true) {
    $(divBoxId).addEventListener('click', function(e) {
        var node = e.target;
        var num = [].indexOf.call(node.parentNode.childNodes, node);
        arr.splice(num, 1);
        if (postion) {
            render(arr, 'showData');
        } else {
            render(arr, 'showBottomData');
        }
    });
    $(divBoxId).addEventListener('mouseover', function(e) {
        var node = e.target;
        var num = [].indexOf.call(node.parentNode.childNodes, node);
        node.textContent = '删除：' + node.textContent;
        node.style.background = 'green';
    });
    $(divBoxId).addEventListener('mouseout', function(e) {
        var node = e.target;
        node.textContent = node.textContent.replace('删除：', '');
        node.style.background = 'red';
    })
}

function $(select) {
    return document.querySelector(select);
}

function render(arr, divId) {
    var str = "";
    divId = '#' + divId;
    if (arr.length === 0) {
        $(divId).innerHTML = '';
    } else {
        str = arr.map(function(e) {
            return "<div class='box'>" + e + "</div>";
        });
        $(divId).innerHTML = str.join('');
    }

}

function unqiue(test, arr, isArr = false) {
    if (isArr) {
        test = test.join('');
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (test == arr[i]) {
            return false;
        }
    }
    return true;
}

function init() {
    var testId = '#' + 'showBottomData';
    var testId2 = '#' + 'showData';
    initButton();
    initDivDelted(testId2, tag);
    initDivDelted(testId, tag_botton, false);
}

window.onload = function() {
    init();
};
