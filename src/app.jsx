var React = require("react");
var ReactDom = require("react-dom");
var Header = require("./header");
var ItemList = require("./itemlist");
var Reflux = require("reflux");
var RefluxStore = require("./reflux").store;
var RefluxActions = require("./reflux").actions;

var App = React.createClass({
  mixins: [Reflux.connect(RefluxStore, "items")],
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="text-center">ReactTodos</h1>
          <Header />
        </div>
        <div className="panel-body">
          {this.getItemListContents()}
        </div>
        <div className="panel-footer">
          <div className="text-center">
            <button type="button" className="btn btn-default" onClick={this.handleAllDoneClick}>All Completed</button>
            <button type="button" className="btn btn-default" onClick={this.handleClearDoneClick}>Clear Completed</button>
          </div>
        </div>
      </div>
    )
  },
  getItemListContents: function() {
    if (this.state.items.length > 0) {
      return (
        <ItemList items={this.state.items}/>
      );
    } else {
      return (
        <h3 className="text-center">Nothing!</h3>
      );
    }
  },
  handleAllDoneClick: function() {
    RefluxActions.allCompleted();
  },
  handleClearDoneClick: function() {
    RefluxActions.clearCompleted();
  }
});

ReactDom.render(<App />, document.getElementById("todo-container"));
