function add(a, b) {
  return b !== undefined
    ? a + b
    : function (c) {
        return c + a;
      };
}

function sub(a, b) {
  return b !== undefined
    ? a - b
    : function (c) {
        return c - a;
      };
}

function mul(a, b) {
  return b !== undefined
    ? a * b
    : function (c) {
        return c * a;
      };
}

function div(a, b) {
  return b !== undefined
    ? a / b
    : function (c) {
        return c / a;
      };
}

function pipe(...args) {
  let res = null;
  return function (c) {
    for (let i = 0; i < args.length; i++) {
      if (i === 0) {
        res = args[i](c);
      } else {
        res = args[i](res);
      }
    }

    return res;
  };
}

let a = add(1, 2);
let b = mul(a, 10);
let sub1 = sub(1);
let c = sub1(b);
let d = mul(sub(a, 1))(c);

let doSmth = pipe(add(d), sub(c), mul(b), div(a));
let result = doSmth(0);
let x = pipe(add(1), mul(2))(3);
console.log(result);
console.log(x);
