
module.exports = function (app) {


    app.get('/login', function (req, res) {
        res.render('login', {
            title: 'Express Login'
        });
    });
    var user = require('./user.js');
    var photos = require('./photos.js');


    app.get('/', photos.list);
    app.get('/users', user.list);
    app.get('/upload', photos.form);
    app.post('/upload', photos.submit(app.get('photos')));
    app.get('/photo/:id/download', photos.download(app.get('photos')));

};
