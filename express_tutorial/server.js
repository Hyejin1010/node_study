var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

app.set('views', __dirname + '/views');
// 서버거 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var serve = app.listen(3000, function() {
    console.log('Express server has started on port 3000');
    // 정적파일을 다루기 위해
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/**
 * secret: 쿠키를 임의로 변조하는 방지하기 위한 sign값 (원하는 값을 넣으면 된다)
 * resave: 세션을 언제나(변경되지 않아도) 저장할 지 정하는 값.
 *          express-session documentation에서는 이 값을 false 로 하는것을 권장한다. 
 *          때문에 필요에 따라 true 설정한다.
 * saveUnintialized: 새로 생겼지만 변경되지 않은 세션을 의미. 
 *                   documentation에서는 이 값을 true로 설정하는 것을 권장한다.
 */
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
}));

var router = require('./router/main')(app, fs);