### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  Open-source object-relational databse management system best used for scalability and adherence to standards suppourting both

- What is the difference between SQL and PostgreSQL?
  Sql is a standarized programming language used to manage and manipulate relational databases. Used for querying, updating, inserting and
    deleting data within a database.
  PSQL is an open source object relational database management system that uses SQL as its primary querying language. it is desinged to handle workloads from a single machine applicatoin to large scale  data warehousing.

- In `psql`, how do you connect to a database?
  To connect to a database using PostgreSQL you need to use the `\c` or (`\connect`) command followed by the database name
  in terminal
  psql
  \c database_name
  psql -h hosetname -p port -U username -d database_name

- What is the difference between `HAVING` and `WHERE`?
  In SQL `HAVING` and `WHERE` clauses are used to filter data, but they are unsed in different purpouses.
  `WHERE` clause is used to filter rows before any grouping is performed. It can be used with `SELECT`, `UPDATE`, `DELETE`, to filter rows from a table based on specific conditions.
  The `HAVING` having clause is used only with `SELECT` statements that include a `GROUP BY` clause. filtering out the results of groups created by the    `GROUP BY` clause.


- What is the difference between an `INNER` and `OUTER` join?
  In SQL joins are used to combine rows from two or more based tables
  An `INNER` join returns rows that have matching values in both tables, an intersection of two sets.
  Including only records where theres a corresponding match in the tables
  `OUTER` join retruns all the rows from one table, and the matched row from the other table.
  Outer joins include three types LEFT OUTER JOIN which  Returns all rows from the left table
  Right outer Join retruns al rows from the right table and FULL outer JOIN which returns all rows when there is a match in either left or right table



- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
the main difference between a left outer join and a right outer join lies in which table data is preserved in the result set.
th left oute join preserves all rows from the left table
while the right outer join oreerved all rows from the right table inlcuding only matching

- What is an ORM? What do they do?

ORM stands for Object-Relationsal-Gap. it is a programming technique that simplifies the interaction between object oriented programming languages such as python, java, ruby and relational databases like MYSQL and PostgreSQL

- What are some differences between making HTTP requests using AJAX
  and from the server side using a library like `requests`?

  AjAX and server-side libraries like requests both involve making HTTP requests, but they operate in fundamentally different browsers
  their purpose is to fetch data from a server with out reloading the entire page, by creating dynamic and interactive user experience
  their enviroment is in the client/browser side.

  HTTP requests  are  backend server side which performs various tasks like fetching data from external APIs interacting databases and building web applications.


- What is CSRF? What is the purpose of the CSRF token?

CSRF Token Stands for Site Requests Forgery, a web security vulnerability that tricks a user browser into executing an unwanted action on a trusted website it works by the implementation of tokesn to protect against csrf. a user is athenticate to a trusted website, a link or form tagets the vulnerable website, user is tricked into clicking the malicious link or submitting form, the browser automatically sends a request to the trusted website with the users authentication information; and the server executes the request, believing it came from a legitimate user.
Tokens are use to prevent such informtaion to be filtered out as they are submitted.

- What is the purpose of `form.hidden_tag()`?

The purpouse of the form.hidden_tag() is to render a hidden input field within a form. it is a method used in web frameworks like Flask_WTF, it serves a crucial purpouse in Cross-Site Request Forgery protection.