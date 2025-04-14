function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

// 형상관리 측면에서 여러 줄에 걸쳐서 표시하는 것이 좋음
module.exports = {
  add,
  sub,
  mul,
  div,
};
