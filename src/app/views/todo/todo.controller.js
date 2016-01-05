(function(){
  'use strict';

  angular
    .module('formationAngularLyon')
    .controller('TodoController', TodoController);

  /** @ngInject */
  function TodoController(list, Todo, config, $mdDialog, toastr, $filter, $log) {
    var vm = this;

    vm.query = {
      page: 1,
      limit: 5
    };

    vm.count = config.listsCount.todo;

    vm.list = list;

    vm.onPaginationChange = paginationChange;
    vm.creationDialog = creationDialog;
    vm.removeSelected = removeSelected;
    vm.onOrderChange = onOrderChange;
    vm.editDialog = editDialog;

    function onOrderChange(filter){
      vm.list = $filter('orderBy')(vm.list, filter);
    }

    function paginationChange(){
      return Todo.findAll({
        _start:(vm.query.page - 1) * vm.query.limit,
        _limit: vm.query.limit
      })
        .then(function(todos){
          vm.list = todos;
        })
        .catch(errorHandler);
    }

    function creationDialog(event){
      return $mdDialog.show({
        templateUrl: 'app/views/todo/dialog/todo.dialog.html',
        controller: 'TodoDialogController',
        controllerAs: 'dialog',
        targetEvent: event,
        locals: {
          options:{
            title: 'Add a new thing to do',
            buttonLabel: 'I will do it !'
          }
        }
      })
        .then(function(createdDTodo){
          vm.list.push(createdDTodo);
          toastr.info('created !!!!')
        })
    }

    function editDialog(event,todo, index){
      return $mdDialog.show({
        templateUrl: 'app/views/todo/dialog/todo.dialog.html',
        controller: 'TodoDialogController',
        controllerAs: 'dialog',
        targetEvent: event,
        locals: {
          options:{
            todo: todo,
            title: 'change your plan for '+todo.name,
            buttonLabel: 'better like this'
          }
        }
      })
        .then(function(updatedTodo){
          vm.list[index] = updatedTodo;
          toastr.info('updated !!!!')
        })
    }

    function removeSelected(){
      return Promise.all(vm.selected.map(function(todo){
        return Todo.destroy(todo.id);
      }))
        .then(function(){
          toastr.info('removed !!!!')
        })
        .catch(errorHandler)
    }

    function errorHandler(err){
      $log.error(err);
      toastr.error('something wrong happened');
    }

  }


})();
