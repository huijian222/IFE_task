function $(select) {
    return document.querySelector(select);
}

function render_Spaceship_Fly(spceship) {
    //判断飞船 DIV 的显示有没有打开
    if(spceship.style.display !== 'block') {
        spceship.style.display = 'block';
    }

}

var spaceShip = function(id) {
    var SPACE_SPEED = 20;
    var SPACE_NEED_CHARGE = 5;
    var SPACE_CHARGE_SPEED = 5;
};