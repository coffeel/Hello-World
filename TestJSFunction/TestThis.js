/*The bottom line is you should look at the call site to figure out
whether the function is invoked as a property of an object or on its own.
If its invoked as a property, then that property will become this,
otherwise this will be assigned the value of the global object, or window.*/
var parent = {
    method: function () {
        console.log(this);
    }
};

parent.method();

var parentless = parent.method;
parentless();



/*In the next case, this will stay the same across the scope chain,
this is the exception to the rule, and often leads to confusion among amateur developers.*/
function scoping () {
    console.log(this);

    return function () {
        console.log(this);
    };
}

scoping()();