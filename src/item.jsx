var React = require('react');
var RefluxActions = require("./reflux").actions;
var PropTypes = React.PropTypes;

var Item = React.createClass({
  getInitialState: function() {
    return ({
      text: this.props.item.text,
      done: this.props.item.done,
      changed: false
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      done: nextProps.item.done
    });
  },
  render: function() {
    return (
      <div className="input-group todo-item">
        <span className="input-group-addon">
          <input type="checkbox" checked={this.state.done} onChange={this.handleDoneChanged}></input>
        </span>
        <input className="form-control" value={this.state.text} onChange={this.handleTextChanged}></input>
        <span className="input-group-btn">
          {this.controlButtons()}
          <button className="btn btn-default" type="button" onClick={this.handleDelClicked}>DEL</button>
        </span>
      </div>
    );
  },
  handleDoneChanged: function(event) {
    var item = this.props.item;
    item.done = event.target.checked;
    RefluxActions.updateTodoItem(item);
    this.setState({
      done: event.target.checked
    });
  },
  handleTextChanged: function(event) {
    this.setState({
      text: event.target.value,
      changed: true
    });
  },
  handleDelClicked: function() {
    RefluxActions.removeTodoItem(this.props.item.uuid);
  },
  handleUndoClicked: function() {
    this.setState({
      text: this.props.item.text,
      changed: false
    });
  },
  handleSaveClicked: function() {
    var item = this.props.item;
    item.text = this.state.text;
    RefluxActions.updateTodoItem(item);
    this.setState({
      changed: false
    });
  },
  controlButtons: function() {
    var buttons = null;
    if (this.state.changed) {
      buttons = [
        <button key="SaveBtn" className="btn btn-default" type="button" onClick={this.handleSaveClicked}>SAVE</button>,
        <button key="UndoBtn" className="btn btn-default" type="button" onClick={this.handleUndoClicked}>UNDO</button>
      ];
    }
    return buttons;
  }
});

module.exports = Item;
