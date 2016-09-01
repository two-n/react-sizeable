# Sizeable

```jsx
import Sizeable from 'react-sizeable'

<Sizeable>
  <MyComponent />
</Sizeable>
```

`<MyComponent>` element will receive `width` as a prop. Alternative usage:

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
