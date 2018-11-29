import React from 'react';

const Counter = ({
  counter,
  decrement,
  decrementAsync,
  increment,
  incrementAsync,
}) => (
  <React.Fragment>
    <p>Counter: {counter}</p>
    <div>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
    <div>
      <button onClick={() => incrementAsync()}>IncrementAync</button>
      <button onClick={() => decrementAsync()}>DecrementAsync</button>
    </div>
  </React.Fragment>
);

export default Counter;
