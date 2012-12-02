// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

// below are some general tests but feel free to delete them.

module("example tests");
test("HTML5 Boilerplate is sweet", function() {
    expect(1);
    equals("boilerplate".replace("boilerplate", "sweet"), "sweet", "Yes. HTML5 Boilerplate is, in fact, sweet");

})
// these test things from plugins.js
test("Environment is good", function() {
    expect(3);
    ok(!!window.log, "log function present");

    var history = log.history && log.history.length || 0;
    log("logging from the test suite.")
    equals(log.history.length - history, 1, "log history keeps track")

    ok(!!window.Modernizr, "Modernizr global is present")
})
module('Module B');
// Let's test this function
function isEven(val) {
    return val % 2 === 0;
}

test('isEven()', function() {
    ok(isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
    // Fails
    ok(isEven(3), 'Three is an even number');
})
test('test', function() {
    equals({}, {}, 'fails, these are different objects');
    equals({
        a : 1
    }, {
        a : 1
    }, 'fails');
    equals([], [], 'fails, there are different arrays');
    equals([1], [1], 'fails');
})
test('test', function() {
    same({}, {}, 'passes, objects have the same content');
    same({
        a : 1
    }, {
        a : 1
    }, 'passes');
    same([], [], 'passes, arrays have the same content');
    same([1], [1], 'passes');
})
test('test', function() {
    equals(0, false, 'true');
    same(0, false, 'false');
    equals(null, undefined, 'true');
    same(null, undefined, 'false');
})
//看？这就好像我们没有写任何断言一样。这是因为断言是被异步执行的，到它被调用的时候，此次测试已经执行完成。
test('asynchronous test error', function() {
    setTimeout(function() {
        ok(true, "ok");
    }, 100)
})
//在这，我们使用了stop()去暂停此次测试案例， 并且在断言被调用以后，
//我们使用start()继续。在调用完test()后立即调用stop()是很平常的；所以QUnit提供了一个捷径：asyncTest()。
test('asynchronous test right', function() {
    // Pause the test first
    stop();
    setTimeout(function() {
        ok(true, "ok");
        // After the assertion has been called,
        // continue the test
        start();
    }, 100)
})
asyncTest('asynchronous test asyncTest', function() {
    // The test is automatically paused

    setTimeout(function() {
        ok(true, "AsyncTest");

        // After the assertion has been called,
        // continue the test
        start();
    }, 100)
})
/**
 * 还有一点要注意：setTimeout()通常会调用它自己的回调函数，但如果它是一个自定义的函数（例如：一个Ajax调用）。
 * 你如何确认回调函数被调用了呢？并且如果回调函数没有被调用，start()将不会被执行，整个单元测试将被挂起：
 */
// A custom function
function ajax(successCallback) {
    $.ajax({
        url : 'server.php',
        success : successCallback
    });
}

/*
 * 你可以通过延时去stop()，它告知QUnit，“如果start()在延时后没有被调用，你应未通过测试”。
 * 你可以确认的是整个测试没有挂起而且如果哪里出了问题你可以注意到。
 */
test('asynchronous test ajax', function() {
    // Pause the test, and fail it if start() isn't called after one second
    stop(1000);

    ajax(function() {
        // ...asynchronous assertions

        start();
    })
})
test('asynchronous test ajax 2', function() {
    // Pause the test
    stop();

    ajax(function() {
        // ...asynchronous assertions
    })
    ajax(function() {
        // ...asynchronous assertions
    })
    setTimeout(function() {
        start();
    }, 2000);
})
//延时应该适当的长足够来允许二者的回调函数在测试继续执行前被调用。
//但是如果其中一个回调函数没有被调用怎么办？你怎样去知道？这就是expect()加入的原因：
//你给expect()传一个数字告知QUnit你期望X个断言去执行，如果一个断言未被执行，这个数字将不会匹配，而且你会注意到有些东西出错了。
// A custom function
test('asynchronous test ajax 3', function() {
    // Pause the test
    stop();

    // Tell QUnit that you expect three assertions to run
    expect(3);

    ajax(function() {
        ok(true);
    })
    ajax(function() {
        ok(true);
        ok(true);
    })
    setTimeout(function() {
        start();
    }, 2000);
})
// Tell QUnit that you expect three assertion to run
test('asynchronous test ajax 3', 3, function() {
    // Pause the test
    stop();

    ajax(function() {
        ok(true);
    })
})
