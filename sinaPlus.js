/**
 * Created by Bill on 2016/9/27.
 */
var Bin = {
    on: function (element, type, handler, userCapture) {
        if (document.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else if (document.addEventListener) {
            element.addEventListener(type, handler, userCapture);
        }
    },

    off: function (element, type, handler, userCapture) {
        if (document.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else if (document.removeEventListener) {
            element.removeEventListener(type, handler, userCapture);
        }
    },

    eventDispatch: function (element, type, customProperty) {
        if (document.fireEvent) {
            var event = document.createEventObject();
            event.eventType = type;
            event.dispatchFlag = true;
            element.fireEvent("on" + type, event);
        } else if (document.dispatchEvent) {
            var event = new MouseEvent(type, {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            event.dispatchFlag = true;
            if (customProperty) {
                for (var key in customProperty) {
                    if (!(key in event)) {
                        event[key] = customProperty[key];
                    }
                }
            }
            element.dispatchEvent(event);
        }
    },

    ready: function (fn) {
        if (document.attachEvent) {
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState == "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    fn();
                }
            });
        } else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                fn();
            }, false);
        }
    },

    /*
    styleChange: function (element, style, interval) {
        return new Promise(function (resolve, reject) {
            element.setAttribute("style", style);
            setTimeout(function () {
                resolve(null);
            }, interval);
        });
    }, */

    styleChange: function (elements, style, interval){
        return new Promise(function (resolve, reject){
            if(Object.prototype.toString.call(elements).slice(8, -1) === "Array"){
                elements.forEach(function(element){
                    element.setAttribute("style", style);
                });
                setTimeout(function(){
                    resolve(null);
                }, interval);
            }else{
                elements.setAttribute("style", style);
                setTimeout(function(){
                    resolve(null);
                }, interval);
            }
        });
    },

    cssCapture: function (element, attr) {
        if (element.currentStyle) {
            return element.currentStyle[attr];
        } else {
            return getComputedStyle(element, null)[attr];
        }
    }

    /*
     deltaT: function(elements, style, interval){

     var styleChange = function(element, style, interval){
     return new Promise(function(resolve, reject){
     element.setAttribute("style", style);
     setTimeout(function(){
     resolve(null);
     }, interval);
     });
     };

     styleChange(elements[0], style, interval).then(function(){
     return styleChange(elements[1], style, interval);
     }).then(function(){
     return styleChange(elements[2], style, interval);
     }).then(function(){
     return styleChange(elements[3], style, interval);
     }).then(function(){
     return styleChange(elements[4], style, interval);
     }).then(function(){
     return styleChange(elements[5], style, interval);
     })
     } */
};

//Bin.deltaT(document.querySelectorAll(".icons .icon a"), "transform: translate(0, 0)", 50)

Bin.ready(function () {

    var plus = document.querySelector(".popMenu a");
    var overlayer = document.querySelector(".overlayer");
    var closeIcon = document.querySelector(".popup .exit i");
    var popup = document.querySelector(".popup");
    var Icons = document.querySelectorAll(".popup .icons .icon a");
    var close = document.querySelector(".popup .exit");
    var close2 = document.querySelector(".popup .exit2");
    var backBtn = document.querySelector(".popup .exit2 .fa:nth-child(1)");
    var closeBtn = document.querySelector(".popup .exit2 .fa:nth-child(2)");
    var more = document.querySelector(".icons .group:nth-child(1) .icon:nth-child(6)");
    var IconWrapper = document.querySelector(".popup .icons");

    var width = window.innerWidth;
    var swipeYN = false;

    var popupFn = function () {
        //overlayer.setAttribute("style", "display: block");
        //popup.setAttribute("style", "display: block");
        document.body.setAttribute("style", "overflow: hidden");

        Bin.styleChange(overlayer, "display: block; opacity: 1", 0).then(function () {
            return Bin.styleChange(popup, "display: block; opacity: 1", 0);
        }).then(function () {
            return Bin.styleChange(closeIcon, "transform: rotate(0deg)", 0);
        }).then(function () {
            return Bin.styleChange([Icons[0],Icons[6]], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange([Icons[1],Icons[7]], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange([Icons[2],Icons[8]], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange([Icons[3],Icons[9]], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange([Icons[4],Icons[10]], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange([Icons[5],Icons[11]], "transform: translate(0, 0)", 50);
        });
    };

    var popupCloseFn = function () {
        document.body.setAttribute("style", ""); //

        Bin.styleChange(closeIcon, "", 0).then(function () {
            return Bin.styleChange([Icons[5], Icons[11]], "", 50);
        }).then(function () {
            return Bin.styleChange([Icons[4], Icons[10]], "", 50);
        }).then(function () {
            return Bin.styleChange([Icons[3], Icons[9]], "", 50);
        }).then(function () {
            return Bin.styleChange([Icons[2], Icons[8]], "", 50);
        }).then(function () {
            return Bin.styleChange([Icons[1], Icons[7]], "", 50);
        }).then(function () {
            return Bin.styleChange([Icons[0], Icons[6]], "", 600);
        }).then(function () {
            return Bin.styleChange(popup, "", 0);
        }).then(function () {
            return Bin.styleChange(overlayer, "", 0);
        }).then(function(){
            return Bin.styleChange(IconWrapper, "", 0);
        }).then(function(){
            close.setAttribute("style", "");
            close2.setAttribute("style", "");
        });
    };

    var swipeFn = function(){
        Bin.styleChange(IconWrapper, "transform: translate(-" + width + "px, 0", 0).then(function(){
            close.setAttribute("style", "display: none");
            close2.setAttribute("style", "display: flex");
            swipeYN = true;
        });
    };

    var swipeBackFn = function(){
        Bin.styleChange(IconWrapper, "", 0).then(function(){
            close.setAttribute("style", "");
            close2.setAttribute("style", "");
            swipeYN = false;
        });
    };

    Bin.on(plus, "touchstart", popupFn, false);
    Bin.on(close, "touchstart", popupCloseFn, false);
    //Bin.on(overlayer, "touchstart", popupCloseFn, false);
    Bin.on(more, "touchstart", swipeFn, false);
    Bin.on(closeBtn, "touchstart", popupCloseFn, false);
    Bin.on(backBtn, "touchstart", swipeBackFn, false);

    //fix overlayer gesture issue
    var startX, startY, timestamp;

    Bin.on(overlayer, "touchstart", function(ev){
        var event = ev || window.event;
        //console.log("touchstart");
        //console.log(event);
        event.preventDefault();
        var touch = event.touches[0];
        //console.log(touch);
        startX = touch.pageX;
        startY = touch.pageY;
        timestamp = +new Date();
    }, false);

    Bin.on(overlayer, "touchmove", function(ev){
        var event = ev || window.event;
        //console.log("touchmove");
        //console.log(event);
        event.preventDefault();
        var touch = event.touches[0];
        var deltaX = touch.pageX - startX;
        var deltaY = touch.pageY - startY;
        if(Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0){
            swipeBackFn();
        }
    }, false);

    Bin.on(overlayer, "touchend", function(ev){
        var event = ev || window.event;
        event.preventDefault();
        //console.log(event);
        var touch = event.changedTouches[0];
        var deltaX = touch.pageX - startX;
        var deltaY = touch.pageY - startY;
        var deltaTime = +new Date() - timestamp;
        if(deltaTime < 300 && Math.abs(deltaX) === 0 && Math.abs(deltaY) === 0){
            popupCloseFn();
        }
    }, false);
});
