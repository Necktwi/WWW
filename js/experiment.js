var Rotate=function(){
    var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    prop,
    el = document.createElement('div');
    for(var i = 0, l = props.length; i < l; i++) {
        if(typeof el.style[props[i]] !== "undefined") {
            prop = props[i];
            break;
        }
    }
    var xAngle = 0, yAngle = 0;
    var logo=document.getElementById('logo');
    setInterval(function(){
        yAngle+=180;
        logo.style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
    }, 2000);
    setTimeout(function(){
        logo.style["width"]="128px";
        logo.style["height"]="128px";
    },0);
}
