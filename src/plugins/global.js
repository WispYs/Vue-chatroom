(function(){
    'use strict';
    var define_Global = function(){
        var Global = {
            avatorArr: [
                "../img/Aether.jpg",
                "../img/Alone.jpg",
                "../img/Eventide.jpg",
                "../img/Frozen Leaves.jpg",
                "../img/Illuminate.jpg",
                "../img/Illuminate2.jpg",
                "../img/Paradisus-Paradoxum.jpg",
                "../img/Petal.jpg",
                "../img/Vibrance.jpg"
                ] 
        }
        return Global;
    }
    if (typeof(Global) === "undefined") {
        window.Global = define_Global();
    } else {
        console.log("Global is already defined.");
    }
})()

