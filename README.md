# Sizeable

Component that passes its computed size (i.e. width only, by default) down to its children. Assumes block-rendered contents.

```jsx
import Sizeable from 'react-sizeable'

<Sizeable>
  <MyComponent />
</Sizeable>
```

`<MyComponent>` element will receive `width` as a prop, as well as `height` and `size` if enabled. Alternative usage:

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

The `width` and `height` props can also be functions of the DOM node, which defaults (if enabled) to the `offsetWidth` and `offsetHeight` properties.

The `component` prop is the placeholder Element to render in place of children, and compute the size of. Defaults to `div`.
