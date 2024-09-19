### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
    React is a JavaScript libraryy for building user interfaces, specially for single page applicatoins to manage dynamic interactoins and rendering of components. you would use react when creating compolex, interactive or dynamic applications.
- What is Babel?
    Babel is a Javascript complier that converts code into a backward-compatible version of JavaScript that can run in older browsrs.
- What is JSX?
    JSX is a syntax extension for JavaScript used in React to describe what the UI should look like.
- How is a Component created in React?
    Components in React can be created as either a function component or a class component.

- What are some difference between state and props?
State represents the internal data that a components manages and can change over time. Props are read only values passed from parent to child component. props are immutable and are used used to pass data and behavior down.

- What does "downward data flow" refer to in React?
    Downward data flow means that data flows from parent component to chil dcomponent via proprs.
- What is a controlled component?
    A controlled component is a form element in React where the value of the input is controlled by the components state.
- What is an uncontrolled component?
    An uncontrolled component is a form element where the DOM itself manages the form input data, not the React component.

- What is the purpose of the `key` prop when rendering a list of components?
    THe key prop helps react identify which items in a list have changed, are added or are removed. keys should be unique and stable across renders to allow react to optimize the re rendering process.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
    Using an array index as the key can lead to issues when the list is reordered items are added/removed, or when the order of items matters.

- Describe useEffect.  What use cases is it used for in React components?
    useEffect is a React hook that runs side effects in functional components. side effects include data fetching, subscription, timers, or manual DOM updates.

- What does useRef do?  Does a change to a ref value cause a rerender of a component?
    useRef creates a mutable object that holds a value or DOM element that persists across renders. a change to a ref calue does not cause teh component to re-render, unlike state.

- When would you use a ref? When wouldn't you use one?
    a ref would be used to access DOM elements directly focusing on an input, to persis values across renders w i thout trigerring re-renders and managing third-party libraries that arent React friendly. we wouldnt use it for general state management or to control rendering logic, as well as passing data between components.

- What is a custom hook in React? When would you want to write one?
    A costum hook is a function that uses React hooks to encapsulate reusable logic. we would write one when multiple components need to share common logic. 
