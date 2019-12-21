var http = require("http");
// var express = require('express');

http.createServer(function(request, response) {
    /*
        HTTP 헤더 전송
        HTTP Status 200 : OK
        Content Type: text/plain
    */
   response.writeHead(200, {'Content-Type': 'text/plain'});

   /*
        Response Body를 "Hello World"로 설정
   */
  response.end("Hello World\n");
}).listen(8081);

console.log("Server running at http:127.0.0.1:8081");

// events 모듈 사용
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter();