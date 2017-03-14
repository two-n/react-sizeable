import { Component, Children, createElement, cloneElement, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { select } from "d3-selection"

export default class extends Component {
  
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.func]),
    height: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.func]),
    component: PropTypes.any,
  }

  static defaultProps = {
    width: true,
    height: false,
  }

  constructor(props) {
    super(props)
    this.state = { size: null }
  }

  setSize() {
    const { width, height } = this.props,
          node = findDOMNode(this)
    this.setState({
      size: [
        typeof width === 'function' ? width(node) :
          typeof width === 'number' ? width :
          width ? node.parentNode.offsetWidth : null,
        typeof height === 'function' ? height(node) :
          typeof height === 'number' ? height :
          height ? node.parentNode.offsetHeight : null,
      ]
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props !== nextProps ||
      this.state.size == null || nextState.size == null ||
      this.state.size[0] !== nextState.size[0] ||
      this.state.size[1] !== nextState.size[1]
    )
  }

  componentDidMount() {
    this.setSize()
    select(window).on(`resize.${this.ns = Math.random()}`, this.setSize.bind(this))
  }
  componentWillUnmount() {
    select(window).on(`resize.${this.ns}`, null)
  }

  render() {
    const { size } = this.state
    const { children, component } = this.props

    const childProps = size && { size, width: size[0], height: size[1] }

    return (
      component != null
        ? createElement(component, null, size && (
            typeof children === 'function'
              ? children(childProps)
              : Children.map(child => cloneElement(child, childProps))
          ))
        : size == null
          ? createElement('span')
          : typeof children === 'function'
              ? children(childProps)
              : cloneElement(Children.only(children), childProps)
    )
  }
}
