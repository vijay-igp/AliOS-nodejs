/*
 * Copyright (C) 2017 Alibaba Group Holding Limited. All Rights Reserved.
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict';

var common = require('../common');
var assert = require('assert');

var worker = new ThreadWorker("test/thread-worker/stress-post.js")

var result;
var exit = function() {
  assert.equal(result, "OK");
}

var count = 0;

worker.onmessage = function(env) {
    if (env.data === "hello") {
        count = count + 1;
        return;
    } else if (env.data === "end") {
        if (count !== 1000) {
            console.log("Real is " + count);
            console.log("Excepte is : 1000");
            console.log("Result:Fail");
        } else {
            console.log("Result:OK");
        }
    } else if (env.data === "OK") {
        result = "OK";
        console.log("Result:" + result);
    } else {
        result = "Fail";
        console.log("Result:" + result);
    }

    worker.terminate();
    exit();
}

for (var i = 0; i < 1000; i++) {
    worker.postMessage("hello");
}

worker.postMessage("end");
