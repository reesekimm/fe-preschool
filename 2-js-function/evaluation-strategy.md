# `call by value` vs `call by reference` in Javascript

`call by value`와 `call by reference`는 프로그래밍 언어에서 사용되는 평가전략(Evaluation Strategy)의 일종이다.

평가전략이란 프로그래밍 언어에서 다음의 두 가지를 결정하는 방법을 말하는데

1. 함수 호출의 arguments를 언제 평가 할 것인가?
2. 어떤 종류의 값을 함수에게 전달할 것인가?

쉽게 얘기하면 함수에 어떤 인자를 전달해서 어떻게 실행시킬 것인지를 결정하는 언어의 동작 방식이라고 볼 수 있다.

<br />

## call by value

1. arguments로 값이 넘어온다.
2. 값이 넘어올 때 복사된 값이 넘어온다.
3. caller(호출하는 녀석)가 인자를 복사해서 넘겨줬으므로 callee(호출당한 녀석)에서 해당 인자를 수정해도 caller는 영향을 받지 않는다.

```js
var a = 1;

// callee
var func = function(b) {
  b = b + 1;
};

func(a); // caller

console.log(a); // 1
```

<br />

## call by reference

1. arguments로 reference(값에 대한 참조 주소, 메모리 주소를 담고있는 변수)를 넘겨준다.
2. reference를 넘기다 보니 해당 reference가 가리키는 값을 복사하지는 않는다.
3. caller(호출하는 녀석)가 인자를 복사해서 넘기지 않았으므로 callee(호출당한 녀석)에서 해당 인자를 수정하면 caller는 영향을 받는다.

```
var a = {};

// callee
var func = function(b) {
  b.a = 1;
};

func(a); // caller

console.log(a.a); // 1
```

<br />

그렇다면 _Javascript는 `call by value`이면서 **동시에** `call by reference`방식으로 동작하는걸까?_

<br />

답은 '**NO**' 이다.<br />아래 소스 코드를 보자.

```js
var a = {};

// callee
var func = function(b) {
  b = 1;
};

func(a); // caller

console.log(a); // {}
```

`a`는 참조타입의 빈 객체이지만 `func()`에 의해 변경되지 않았다. **Javascript는 무조건 call by value로 동작**하기 때문이다. 함수에 참조값을 전달하면 실제로는 참조값에 대한 복사본(deep copy)을 만들어서 전달한다.

console.log를 사용해서 확인해보자.

```js
var a = {};

// callee
var func = function(b) {
  console.log(b); // {}           ┐ (1)
  console.log(a === b); // true   ┘
  b = 1;
  console.log(b); // 1            ┐ (2)
  console.log(a === b); // false  ┘
};

func(a); // caller

console.log(a); // {} ── (3)
```

**(1)** ─ `a`의 reference를 deep copy한 **복사본** `b`가 전달됐다. `a`와 `b` 둘 다 동일한 reference를 참조, 그 안에 담긴 빈객체를 가리키고 있는 상태다.<br />

**(2)** ─ `b`가 가리키는 대상을 1로 **재할당**하면서 `b`는 이제 메모리상에 다른 곳에 위치한 1을 참조하게 되었다. (`a`는 여전히 기존 메모리 위치의 빈 객체를 참조)<br />

**(3)** ─ `func()`에 의해 수정된 대상은 `a`가 아니라 `a`의 복사본인 `b`이기 때문에 여전히 빈 객체가 출력된다.

<br />

## 결론

- 자바스크립트는 `call by value` 방식으로 동작한다.
- 참조 타입을 인자로 넘기면 참조값을 deep copy한 복사본이 넘어간다.
- 함수 내부에서 복사본을 수정(e.g. 객체의 프로퍼티 수정)할 경우 참조관계에 의해 변경사항이 원본에도 영향을 끼치지만(call by reference 처럼)
- 복사본에 값을 '재할당' 할 경우 복사본과 원본의 참조관계가 깨지면서 변경사항이 생겨도 서로 영향을 미치지 않게 된다.

<br />

---

**Reference**

- https://perfectacle.github.io/2017/10/30/js-014-call-by-value-vs-call-by-reference/
- https://en.wikipedia.org/wiki/Evaluation_strategy
- https://okky.kr/article/303162
- https://www.opentutorials.org/module/4075/24882
- https://blueshw.github.io/2018/09/15/pass-by-reference/
