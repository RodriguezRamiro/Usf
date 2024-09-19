### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  React router is a library that enables dynamic routing in React applications. it allows developers to create single page applications with multiple views by mapping URL paths to different components which are rendered conditionally

- What is a single page application?
  A single page application is a web app that loads a single html page and dynamically update content as the user interacts with the app instead of loading new pages from the server.

- What are some differences between client side and server side routing?
  client side routing happens entirely in the browser. react router handles the navigations by updating the url and displaying the correct components.
  Server side routing involves the server sending a new html page to the client when the url changes.

- What are two ways of handling redirects with React Router? When would you use each?
Navigate for redirects within JSX and useNavigate for redirects inside functions or event handlers

- What are two different ways to handle page-not-found user experiences using React Router?
define a route that catches any undefined path using "*" as the path. this route renders a 404 page not found component. Programatic check inside a component, check for a specific condition like wether the data for a route exists and programatically redirect or display a 404 error.

- How do you grab URL parameters from within a component using React Router?
grab url parameters using the useParams hook for dynamic routing like accessing a user ID from the url.

- What is context in React? When would you use it?
  Context in React provides a way to share between components without gaving to pass props manually at every level. it is used when you have global data like user authentication or theme settinfs.

- Describe some differences between class-based components and function
  components in React.
  state and lifecycle class components use this.state and lifecycle methods while function components use hooks to manage state and side effect. syntax function components are simpler and use ES6 functions while class components require class syntax and methods.
  Hooks can only be used in function components, providing more flexibility with state, side effects and context.
  Performance, functoin components tend to be more lightweifht and easier to optimize with hooks and memorzation.

- What are some of the problems that hooks were designed to solve?

hook sis desinged to resolved several problimes such as allowing function components to handle state and side effects. It allow developers to extract and reuse logic without the need for complex patterns like higher-order components or render props. it also helps reduce the verbosity and complexity of class components, making code easier to read and maintain by replacing lifecycle methods with simple declarative hooks.