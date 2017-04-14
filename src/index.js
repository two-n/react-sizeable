import { Component, Children, createElement, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

export default class Sizeable extends Component {
  
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.number, PropTypes.func
    ]),
    height: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.number, PropTypes.func
    ]),
    component: PropTypes.any,
  }

  static defaultProps = {
    width: true,
    height: false,
  }

  state = { size: null }

  constructor(props) {
    super(props)
    this.setSize = this.setSize.bind(this)
  }

  representSize(size) {
    const { width, height } = this.props
    if (size == null) return size

    const sizeProps = {}
    if (width) sizeProps.width = size[0]
    if (height) sizeProps.height = size[1]
    if (width && height) sizeProps.size = size
    return sizeProps
  }

  setSize() {
    const { width, height } = this.props,
          { size } = this.state,
          node = findDOMNode(this)

    const newSize = [
      typeof width === 'function' ? width(node) :
        typeof width === 'number' ? width :
        width ? node.parentNode.offsetWidth : null,
      typeof height === 'function' ? height(node) :
        typeof height === 'number' ? height :
        height ? node.parentNode.offsetHeight : null,
    ]

    if (size == null) {
      this.setState({ size: newSize })
    }
    else if (this.shouldResize(this.representSize(size), this.representSize(newSize))) {
      // Redundancy to work around Edge greedily evaluating operands
      this.setState({ size: newSize })
    }
  }

  shouldResize(previous, current) {
    return (this.props.width && current.width !== previous.width) ||
           (this.props.height && current.height !== previous.height)
  }

  componentDidMount() {
    this.setSize()
    window.addEventListener('resize', this.setSize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize)
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
              ? children(this.representSize(size))
              : Children.map(child => cloneElement(child, this.representSize(size)))
          ))
        : size == null
          ? createElement('span')
          : typeof children === 'function'
              ? children(this.representSize(size))
              : cloneElement(Children.only(children), this.representSize(size))
    )
  }
}
