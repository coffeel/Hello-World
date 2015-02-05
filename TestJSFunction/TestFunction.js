/**
 * Created by YXue on 2/1/2015.
 */
var add = function (a, b) {
    return a + b;
};

var sum = add(1, 2);


var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment(2);
document.writeln(myObject.value);

myObject.double = function () {
    var that = this;

    var helper = function () {
        that.value = add(that.value, that.value)
    };

    helper();
};

myObject.double();
document.writeln(myObject.value);

//Example
var Quo = function (string) {
    this.status = string;
}

Quo.prototype.get_status = function () {
    return this.status;
}

var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());


//Example
var array = [3, 4];
var sum = add.apply(null, array);
var statusObject = {
    status: 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject);


//Example
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42));

//Example

String.prototype.deentityify = function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    return function () {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}();

document.writeln('&lt;&quot;&gt;'.deentityify());


//Example
var myArray = [];
var arrLength = myArray.length;

myArray[1000000] = true;
var newLength = myArray.length;

Array.prototype.reduce = function (f, value) {
    var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
};

var data = [4, 8, 15];
var add = function (a, b) {
    return a + b;
};

var sum = data.reduce(add, 0);


document.writeln(sum);

//Regular Expression
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
var url = "http://www.ora.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = ' ';
var i;
for (i = 0; i < names.length; i += 1) {
    document.writeln(names[i] + ':' +
        blanks.substring(names[i].length), result[i]);
}


//Example of ARRAY

var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true, 'm');
document.writeln(c.join(','));


c.push('n');
document.writeln(c.join(','));
c.pop();
document.writeln(c.join(','));
c.reverse();
document.writeln(c.join(','));
var d = c.shift();
document.writeln("C: " + c.join(''));

//overwrite existing function
Array.prototype.shift = function () {
    return this.splice(0, 2)[0];
};

var d = c.shift();
document.writeln("C: " + c.join(''));
c.sort();
document.writeln("Sorted: " + c.join());

Array.prototype.goodSort = function () {
    this.sort(function (a, b) {
        if (a === b)return 0;
        if (typeof a === typeof b)return a < b ? -1 : 1;
        return typeof a < typeof b ? -1 : 1;
    });
}

var m = [4, 12, 43, 2, 3, 7, 23, 53];
m.goodSort();
document.writeln("M Sorted: " + m.join(','));

var n = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
n.goodSort();
document.writeln("N Sorted: " + n.join(','));

var o = ['a', 'b', 'c'];
var p = o.unshift('?', '@');


//Example FUNCTION
Function.prototype.bind = function (that) {
    var method = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);
    return function () {
        return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
};

var x = function () {
    return this.value;
}.bind({value: 666});
alert(x());

