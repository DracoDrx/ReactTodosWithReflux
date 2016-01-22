var Reflux = require("reflux");
var Store = require("store");

var LocalStorageKey = "todos";

var refluxActions = Reflux.createActions([
  "addTodoItem",
  "removeTodoItem",
  "updateTodoItem",
  "allCompleted",
  "clearCompleted"
]);

var refluxStore = Reflux.createStore({
  listenables: refluxActions,
  getInitialState: function() {
    var items = Store.get(LocalStorageKey);
    if (items) {
      this.items = items;
    }
    else {
      this.items = [];
    }
    return this.items;
  },
  onAddTodoItem: function(item) {
    this.items.push(item);
    this.saveAndUpdateView(this.items);
  },
  onRemoveTodoItem: function(uuid) {
    var index = this.getTodoItemIndex(uuid);
    this.items.splice(index, 1);
    this.saveAndUpdateView(this.items);
  },
  onUpdateTodoItem: function(item) {
    var index = this.getTodoItemIndex(item.uuid);
    this.items[index] = item;
    this.saveAndUpdateView(this.items);
  },
  onAllCompleted: function() {
    this.items.forEach(function(item) {
      item.done = true;
    });
    this.saveAndUpdateView(this.items);
  },
  onClearCompleted: function() {
    var newItems = [];
    this.items.forEach(function(item) {
      if (!item.done) {
        newItems.push(item);
      }
    });
    this.items = newItems;
    this.saveAndUpdateView(this.items);
  },
  saveAndUpdateView: function(items) {
    this.trigger(this.items);
    Store.set(LocalStorageKey, this.items);
  },
  getTodoItemIndex: function(uuid) {
    var i;
    for (i = 0; i < this.items.length; i++) {
      if (uuid === this.items[i].uuid) {
        return i;
      }
    }
  }
});

module.exports.actions = refluxActions;
module.exports.store = refluxStore;
