# Sizeable

React component that passes the computed size of its parent (i.e. width only, by default) down to its children. Assumes block-rendered contents, and that sizing depends on window size only.

`npm install --save react-sizeable` (or `yarn add react-sizeable`)

```jsx
import Sizeable from 'react-sizeable'

<Sizeable>
  <MyComponent />
</Sizeable>
```

`<MyComponent>` element will receive `width` as a prop (unless disabled), as well as `height` (if enabled) and `size`: `[width, height]` (if both enabled).

Alternative usage:

```jsx
<Sizeable>{({ width }) =>
  <div style={{ width }}></div>
}</Sizeable>

<Sizeable height={true}>{({ width, height }) =>
  <div style={{ width, height }}></div>
}</Sizeable>

<Sizeable height={true}>{({ width, height }) =>
  <div style={{ width, height }}></div>
}</Sizeable>

<Sizeable height={true}>{({ size }) =>
  <div style={{ width: size[0], height: size[1] }}></div>
}</Sizeable>
```

The `width` and `height` props can also be numbers or functions of the DOM node, which defaults (if enabled) to the `offsetWidth` and `offsetHeight` properties.

A `component` prop can also be specified (e.g. `"div"` or any React component), in which case the children will be wrapped, which allows for multiple children (or alternatively, a function returning an array). Arbitrary extra props will also be passed through to this wrapping element.

For added flexibility, the component can be extended with a condition for whether or not to resize. For instance, to only update the size if the height changes:

```jsx
class HeightTriggeredSizeable extends Sizeable {
  shouldResize(previous, current) {
    return current.height !== previous.height
  }
}
```
