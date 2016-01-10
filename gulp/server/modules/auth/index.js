var jwt = require('jwt-simple');
var gutil = require('gulp-util');
var _  = require('lodash');
var fs = require('fs-promise');
var config = require('./lib/utils').config;
var ensureAuthenticated = require('./lib/utils').EnsureAuthenticated;

var mockPath = './gulp/server/mockData/user.json';
var mockTweet = './gulp/server/mockData/tweet.json';
var mockComment = './gulp/server/mockData/comment.json';



module.exports = function(server){
  server.post('/auth/signup', function(req, res){
    fs.readJson(mockPath)
      .then(function(data){
        req.body.id = data.length;
        data.push(req.body);
        return fs.outputJson(mockPath,data)
      })
      .then(function(){
        res.json({
          token: jwt.encode(req.body,config.TOKEN_SECRET)
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

  server.post('/auth/signin', function(req, res){
    fs.readJson(mockPath)
      .then((file)=>{
        var user = _.findWhere(file,{
          email: req.body.email
        });
        if(user){
          if(user.password == req.body.password){
            res.json({
              token: jwt.encode(user,config.TOKEN_SECRET)
            });
          }else{
            res.status(403).json({
              message:'forbidden'
            })
          }
        }else {
          res.status(403).json({
            message:'forbidden'
          })
        }
      })
      .catch((err)=>{
        console.log(err);
      });
  });

  server.get('/get/user', function(req, res){
     var dataToSend =[];
      fs.readJson(mockPath)
        .then(function(data){
        dataToSend = data ;
         return data ;
      })        
      .then(function(){
        res.json({
          token: jwt.encode(dataToSend,config.TOKEN_SECRET),
          user:dataToSend
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

  server.get('/auth/me',ensureAuthenticated, function(req, res){
    res.json(req.user);
  });
  
  server.post('/add/tweet', function(req, res){
    console.log('Ajout d\'un tweet');
    fs.readJson(mockTweet)
      .then(function(data){
        req.body.id = data.length;
        data.push(req.body);
        return fs.outputJson(mockTweet,data)
      })
      .then(function(){
        res.json({
          token: jwt.encode(req.body,config.TOKEN_SECRET)
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

  server.get('/get/tweet',ensureAuthenticated, function(req, res){
     var dataToSend =[];
      fs.readJson(mockTweet)
        .then(function(data){
        dataToSend = data ;
         return data ;
      })        
      .then(function(){
        res.json({
          token: jwt.encode(dataToSend,config.TOKEN_SECRET),
          tweets:dataToSend
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

  server.post('/add/comment', function(req, res){
    console.log('Ajout d\'un tweet');
    fs.readJson(mockComment)
      .then(function(data){
        req.body.id = data.length;
        data.push(req.body);
        return fs.outputJson(mockComment,data)
      })
      .then(function(){
        res.json({
          token: jwt.encode(req.body,config.TOKEN_SECRET)
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

    server.get('/get/comment',ensureAuthenticated, function(req, res){
     var dataToSend =[];
      fs.readJson(mockComment)
        .then(function(data){
        dataToSend = data ;
         return data ;
      })        
      .then(function(){
        res.json({
          token: jwt.encode(dataToSend,config.TOKEN_SECRET),
          comment:dataToSend
        });
      })
      .catch(function(err){
        console.log(err);
      });
  });

}
