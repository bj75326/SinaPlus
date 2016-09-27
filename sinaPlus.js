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

    styleChange: function (element, style, interval) {
        return new Promise(function (resolve, reject) {
            element.setAttribute("style", style);
            setTimeout(function () {
                resolve(null);
            }, interval);
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

    var popupFn = function () {
        //overlayer.setAttribute("style", "display: block");
        //popup.setAttribute("style", "display: block");
        document.body.setAttribute("style", "overflow: hidden");

        Bin.styleChange(overlayer, "display: block; opacity: 1", 0).then(function () {
            return Bin.styleChange(popup, "display: block; opacity: 1", 0);
        }).then(function () {
            return Bin.styleChange(closeIcon, "transform: rotate(0deg)", 0);
        }).then(function () {
            return Bin.styleChange(Icons[0], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange(Icons[1], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange(Icons[2], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange(Icons[3], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange(Icons[4], "transform: translate(0, 0)", 50);
        }).then(function () {
            return Bin.styleChange(Icons[5], "transform: translate(0, 0)", 50);
        });
    };

    var popupCloseFn = function () {
        document.body.setAttribute("style", ""); //

        Bin.styleChange(closeIcon, "", 0).then(function () {
            return Bin.styleChange(Icons[5], "", 50);
        }).then(function () {
            return Bin.styleChange(Icons[4], "", 50);
        }).then(function () {
            return Bin.styleChange(Icons[3], "", 50);
        }).then(function () {
            return Bin.styleChange(Icons[2], "", 50);
        }).then(function () {
            return Bin.styleChange(Icons[1], "", 50);
        }).then(function () {
            return Bin.styleChange(Icons[0], "", 600);
        }).then(function () {
            return Bin.styleChange(popup, "", 0);
        }).then(function () {
            return Bin.styleChange(overlayer, "", 0);
        });
    };

    Bin.on(plus, "touchstart", popupFn, false);
    Bin.on(close, "touchstart", popupCloseFn, false);
    Bin.on(overlayer, "touchstart", popupCloseFn, false);
});
