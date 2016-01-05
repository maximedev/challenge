var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var path = require('path');
var glob = require('glob-promise');
var jsonServer = require('json-server');
var bodyParser = require('body-parser');
var conf = require('./conf');


var instance;

function initServer(){
  var server = jsonServer.create();
  server.use(jsonServer.defaults());
  server.use(bodyParser.json());
  return glob('gulp/server/modules/**/index.js')
    .then(function(modules){
      modules.forEach((module)=>{
        require('./'+module.replace('gulp/','').replace('/index.js',''))(server);
      });
      return glob('gulp/server/mockData/*.json');
    })
    .then(function(mocks){
      var db = {};
      mocks.forEach(function(mock){
        db[mock.replace('gulp/server/mockData/','').replace('.json','')] =  require('./'+mock.replace('gulp/',''))
      });
      var router = jsonServer.router(db);
      server.use(router);
      instance = server.listen(3000, function(){
        console.log('web-service listening on port 3000');
      });
    })
}

gulp.task('json-server', function(done) {
  initServer();
  watch('gulp/server/mockData/*', function(){
    instance.close();
    setTimeout(function(){
      initServer();
    },1000)
  })
});
