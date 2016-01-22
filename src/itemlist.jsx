var React = require('react');
var Item = require("./item");
var PropTypes = React.PropTypes;

var ItemList = React.createClass({
  render: function() {
    var items = null;
    if (this.props.items.length > 0) {
      items = this.props.items.map(function(item, index) {
        return (
          <Item key={item.uuid} item={item}/>
        );
      }.bind(this));
    }

    return (
      <div>
        {items}
      </div>
    );
  }
});

module.exports = ItemList;
