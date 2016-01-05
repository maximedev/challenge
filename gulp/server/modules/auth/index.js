var jwt = require('jwt-simple');
var gutil = require('gulp-util');
var _  = require('lodash');
var fs = require('fs-promise');
var config = require('./lib/utils').config;
var ensureAuthenticated = require('./lib/utils').EnsureAuthenticated;

var mockPath = './gulp/server/mockData/user.json';



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

  server.get('/auth/me',ensureAuthenticated, function(req, res){
    res.json(req.user);
  });
}
