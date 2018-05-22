import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.onWKTChange(e, e.target.id);
  }

  render() {
    const content = this.props.content;
  	const listItems = content.map((item) =>
  		<li key={(content.indexOf(item)).toString()} id={content.indexOf(item)} onClick={this.handleOnClick}>{item}</li>
  	);
    return (
    	<ul>
    		{listItems}
      </ul>
    );
  }
}

export default Table;