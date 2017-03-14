# Sizeable

Component that passes the computed size of its parent (i.e. width only, by default) down to its children. Assumes block-rendered contents, and that sizing depends on window size only.

```jsx
import Sizeable from 'react-sizeable'

<Sizeable>
  <MyComponent />
</Sizeable>
```

`<MyComponent>` element will receive `width` as a prop, as well as `height` if enabled. (Also, `size`: `[width, height]`.) Alternative usage:

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

A `component` prop can also be specified (e.g. `component="div"`), in which case the children will be wrapped, which allows multiple children (or alternatively, a function returning an array).
