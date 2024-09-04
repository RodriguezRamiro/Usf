### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

- What is the signature portion of the JWT?  What does it do?

the signature of a JSON Web Token (JWT) verifies the integrity of the token and the sender. The signature is created by combining the encoded header and payload, a secret, and the algorithm specified in the header.

- If a JWT is intercepted, can the attacker see what's inside the payload?

Yes, if a JWT is intercepted, the attacker can see what's inside the payload because JWTs are not encrypted by default.

- How can you implement authentication with a JWT?  Describe how it works at a high level.

User logs in - providing credentials to the server, which then validates them
Server generates JWT to client - server sends the JWT back to the client, who stores it in a cookie or local storage
Client sends JWT to server - client sends request headers to access a protected resource
Server verifies JWT - the server recieves the request and verifies the JWT by checking its signature and decoding      the payload

- Compare and contrast unit, integration and end-to-end tests.
unit test ensures that each unit of code behaves as expected. it tests individual componenets in isolaion, as they run with out dependencies. they provide low complexity as they focus on small single units.
integration tests, tests the interaction between integreated components or modules. it ensures that different parts of the application work together correctly. they are slower than unit tests as they involve multiple componentsand medium complexity, as they test interactions between components.

end to end tests the completee flow of an aplication from start to finish, its purpouse is to ensure taht the entire aplication works as expected, they tend to be the slowest as they simulate user interactions with the aplication testing fullstack applications.

- What is a mock? What are some things you would mock?
a mock is a simulated object or function that mimics the behavior or real objects or interactions in a particular interface. somethings that would require mock tests would be external APIS, databases, network requests and filing systems.

- What is continuous integration?
  a software development practice involving the merging of code changes into a cental repositry and the testing and building the code

- What is an environment variable and what are they used for?
an eviroment variale is a definable value that affects the running processes and behaviors on a computer. they are used for storing configuration settings, changing program functionality handling sensitive data, setting differnt configuration options and making applicatoins more predictiblle.

- What is TDD? What are some benefits and drawbacks?
TDD or test driven development is a development technique of writting tests before writting code. its benefits  include improved code quality, faster feedback, confidence in refctoring and continous improvement. in the process of TDD it also takes longer and it isnt as flexible as other code-writting methods.

- What is the value of using JSONSchema for validation?
  values of using jsonschema include consistency, error preventiion and documentation for validation. it provides a standarized way to validate JSON data structures and defines data typyes of json objects.

- What are some ways to decide which code to test?
some ways to decide which code to tests are to test code that is central to the applications' core functionality.
test complex error-prone code, and coded that if it fails would cause significat issues.
prioritize testing code that is significantly used or exposed to users and test scenarios taht re not typical but could cause failures.


- What does `RETURNING` do in SQL? When would you use it?

RETURNING in SQl is used to retrive values from data statments, such as INSERT, UPDATE or DELETE after the statment has been executed.

- What are some differences between Web Sockets and HTTP?
the difference between WebSocket and HTTP is that websocket is a real time event driven communication protocol providing constant connections between clients and servers. in contrats HTTP is a request response taht seves static resources for server side processing.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
i think the technologoy in flask is better due to is strong ecosystem with python and machine learning. i would prefer to use flask for is flexibility  and simplicity although i must recognize has less built in functionality than express. 