(function(){
    'use strict';
    var define_Global = function(){
        var Global = {
            avatorArr: [
                "http://oodni3sgx.bkt.clouddn.com/Illuminate.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Alone.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Paradisus-Paradoxum.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Eventide.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Aether.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Illuminate2.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Petal.jpg",
                "http://oodni3sgx.bkt.clouddn.com/Frozen%20Leaves.jpg",
                "http://oodni3sgx.bkt.clouddn.com/miku.jpg"
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

