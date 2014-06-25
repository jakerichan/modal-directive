angular.module('modalApp').service('Modal', [
  function () {
    // stores modal objects for lookup
    this.modals = {};
    
    this.registerModal = function (modal) {
      if (!this.modals[modal.id]) {
        this.modals[modal.id] = modal;
      } else {
        console.warn('Modal "'+modal.id+'" already defined');
      }
    }

    this.unregisterModalById = function (id) {
      delete this.modals[id];
    }

    this.getModalById = function (id) {
      return this.modals[id] || console.warn('No modal with "'+id+'" id registered');
    }

  }
]);