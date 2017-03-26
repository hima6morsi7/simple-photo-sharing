var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var multiparty = require('multiparty');

var photos =[];
photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.org/images/logos/nodejs-green.png'
});

photos.push({
  name: 'Ryan Speaking',
  path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function(req, res, next){
  Photo.find({}, function(err, photos) {
    if (err) return next(err);
    res.render('photos', {
	title: 'Photos',
	photos: photos
    });
  });
};

exports.form = function(req, res){
  res.render('photos/upload', {
	title: 'Photo upload'
  });
};


exports.submit = function (dir) {
  return function(req, res, next){
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
      console.log(fields);
      var img = files['photo[image]'][0];
      var name = fields['photo[name]'][0] || img.originalFilename;
      var path = join(dir, img.originalFilename);
      fs.rename(img.path, path, function(err){
        if(err){return next(err); };
        Photo.create({
          name: name,
          path: img.originalFilename
        }, function(err){
          if(err){return next(err); };
          res.redirect('/');
        });
      });
    });
  };
};

//Original code from book - to work with body.parser in app.js
/*exports.submit = function (dir){
  return function(req, res, next){
	var img = req.files.photo.image;
	var name = req.body.photo.name || img.name;
	var path = join(dir, img.name);

	fs.rename(img.path, path, function(err){
	  if (err) return next(err);

	  Photo.create({
	    name: name,
	    path: img.name
	  }, function (err){
	    if (err) return next(err);
	    res.redirect('/');
	  });
	});
  };
};*/

exports.download = function(dir){
    return function (req, res, next){
	var id = req.params.id;
	Photo.findById(id, function(err, photo){
	    if (err) return next(err);
	    var path = join(dir, photo.path);
	    res.sendfile(path);
	});
    };
};  
