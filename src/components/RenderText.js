import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RenderText extends Component {
  state = {
    text: '',
  };

  componentWillMount = async () => {
    const response = await fetch(this.props.url);
    const text = await response.text();
    this.setState({
      text,
    });
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <div>------------------</div>
        <p>{text}</p>
        <div>------------------</div>
      </div>
    );
  }
}

RenderText.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RenderText;
