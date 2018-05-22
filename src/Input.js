import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  handleSubmit(e) {
  	this.props.onSubmit(e);
  }

  render() {
    const coordinates = this.props.coordinates;
    return (
    	<form onSubmit={this.handleSubmit}>
        <label>
          Geometry:
          <input type="text" value={coordinates} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Input;



