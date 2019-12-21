var express = require('express');
var app = express();
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
// 서버거 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var serve = app.listen(3000, function() {
    console.log('Express server has started on port 3000');
    // 정적파일을 다루기 위해
    app.use(express.static('public'));
});