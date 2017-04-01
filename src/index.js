import { Component, Children, createElement, cloneElement, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { select } from "d3-selection"

const representSize = size => size && { size, width: size[0], height: size[1] }

export default class Sizeable extends Component {
  
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

    const size = [
      typeof width === 'function' ? width(node) :
        typeof width === 'number' ? width :
        width ? node.parentNode.offsetWidth : null,
      typeof height === 'function' ? height(node) :
        typeof height === 'number' ? height :
        height ? node.parentNode.offsetHeight : null,
    ]
    if (
      this.state.size == null ||
      this.shouldResize(representSize(this.state.size), representSize(size))
    ) {
      this.setState({ size })
    }
  }

  shouldResize(previous, current) {
    return (this.props.width && current.width !== previous.width) ||
           (this.props.height && current.height !== previous.height)
  }

  componentDidMount() {
    this.setSize()
    select(window).on(`resize.${this.ns = Math.random()}`, this.setSize.bind(this))
  }
  componentWillUnmount() {
    select(window).on(`resize.${this.ns}`, null)
  }

  extraProps() {
    const props = { ...this.props }
    delete props.children
    delete props.component
    delete props.width
    delete props.height
    return props
  }

  render() {
    const { size } = this.state
    const { children, component } = this.props
    return (
      component != null
        ? createElement(component, this.extraProps(), size && (
            typeof children === 'function'
              ? children(representSize(size))
              : Children.map(child => cloneElement(child, representSize(size)))
          ))
        : size == null
          ? createElement('span')
          : typeof children === 'function'
              ? children(representSize(size))
              : cloneElement(Children.only(children), representSize(size))
    )
  }
}
