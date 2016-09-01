import React, { Component, Children, cloneElement, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

class Sizeable extends Component {
  constructor(props) {
    super(props)
    this.state = { size: null }
    this.setSize = this.setSize.bind(this)
  }
  setSize() {
    const { width, height } = this.props,
          node = ReactDOM.findDOMNode(this)
    this.setState({
      size: [
        typeof width === 'function' ? width(node) : width ? node.offsetWidth : null,
        typeof height === 'function' ? height(node) : height ? node.offsetHeight : null,
      ]
    })
  }
  componentDidMount() {
    this.setSize()
    ResizeSensor(ReactDOM.findDOMNode(this), this.setSize)
  }
  componentWillUnmount() {
    ResizeSensor.detach(ReactDOM.findDOMNode(this), this.setSize)
  }
  render() {
    const { size } = this.state
    const { component, children } = this.props
    return React.createElement(component, null, size && (
      typeof children === 'function'
        ? children({ size, width: size[0], height: size[1] })
        : Children.map(children, child => cloneElement(child, { size, width: size[0], height: size[1] }))
    ))
  }
}

Sizeable.propTypes = {
  width: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  height: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  component: React.PropTypes.any,
}

Sizeable.defaultProps = {
  width: true,
  height: false,
  component: 'div',
}

export default Sizeable
