import React, { Component } from 'react';

class Modal extends Component {
  state = {
    outerStyle: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transition: '250ms',
    },
  }

  componentDidMount() {
    const style = {
      backgroundColor: 'rgba(0,0,0,0.9)',
    }
    setTimeout(() => {
      this.updateOuterStyle(style);
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fullDisplay !== this.props.fullDisplay) {
      if (this.props.fullDisplay) {
        console.log('fade in');
      } else {
        console.log('fade out');
        const style = {
          backgroundColor: 'rgba(0,0,0,0)',
        }
        setTimeout(() => {
          this.updateOuterStyle(style);
        }, 0);
      }
    }
  }

  updateOuterStyle = (newOuterStyle) => {
    const stateStyle = this.state.outerStyle;
    const outerStyle = { ...stateStyle, ...newOuterStyle };
    console.log('NEW STYLE', outerStyle);
    this.setState({ outerStyle });
  }

  render() {
    console.log('PROPS', this.props)
    const { outerStyle } = this.state;

    return (
      <div style={outerStyle}>
        {this.props.children}
      </div>
    )
  }
}

export default Modal;