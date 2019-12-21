module.exports = function(app, fs) {
    app.get('/', function(req, res) {
        // 세션 초기 설정(initialize)
        sess = req.session;
        console.log(sess.username);
        res.render('index', {
            title: 'MY HOMEPAGE',
            length: 5,
            name: sess.name,
            username: sess.username
        });
    });

    app.get('/login/:username/:password', function (req, res) {
        let sess = req.session;

        fs.readFile(__dirname + '/../data/' + 'user.json', 'utf8', function (err, data) {
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;
            var result = {};

            if (!users[username]) {
                result.success = false;
                result.error = 'not found';
                res.json(result);
                return;
            }

            if (users[username].password = password) {
                result.success = true;
                sess.username = username;
                sess.name = users[username].name;
            } else {
                result.success = false;
                result.error = 'incorrect';
            }
            res.json(result);
        });
    });

    app.get('/logout', function (req, res) {
        let sess = req.session;

        if (sess.username) {
            req.session.destroy(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/list', function (req, res) {
        fs.readFile(__dirname + '/../data/' + 'user.json', 'utf8', function (err, data) {
            console.log(data);
            res.end(data);
        });
    });

    app.get('/getUser/:username', function (req, res) {
        fs.readFile( __dirname + '/../data/user.json', 'utf8', function (err, data) {
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    app.post('/addUser/:username', function (req, res) { 
        var result = {};
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if (!req.body['password'] || !req.body['name']) {
            result['success'] = false;
            result['error'] = 'invalid request';
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + '/../data/user.json', 'utf8', function (err, data) {
            var users = JSON.parse(data);
            if (users[username]) {
                // DUPLICATION FOUND
                result['success'] = false;
                result['error'] = 'duplication';
                res.json(result);
                return;
            }
            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function(err, data) {
                result = {'success': true};
                res.json(result);
            });
        });
    });

    app.delete('/deleteUser/:username', function (req, res) {
        var result = {};

        // LOAD DATA
        fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
            var users = JSON.parse(data);

            // IF NOT FOUND
            if (!users[req.params.username]) {
                result.success = false;
                result.error = 'not found';
                res.json(result);
                return;
            }

            delete users[req.params.username];
            fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
                result.success = true;
                res.json(result);
                return;
            });
        });
    })
}