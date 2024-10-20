Make sure you download the starter code and run the following:

```sh
  psql < movies.sql
  psql movies_db
```

In markdown, you can place a code block inside of three backticks (```) followed by the syntax highlighting you want, for example

\```sql

SELECT \* FROM users;

\```

Using the `movies_db` database, write the correct SQL queries for each of these tasks:

1.  The title of every movie.

\```SELECT title
    FROM movies;
\```
2.  All information on the G-rated movies.

\````
SELECT *
FROM movies
WHERE rating = 'G';
\```

3.  The title and release year of every movie, ordered with the
    oldest movie first.

    \``` SELECT title, release_year
        FROM movies
        ORDER BY release_year ASC;
    \```

4.  All information on the 5 longest movies.

    \```SELECT title, release_year
        FROM movies
        ORDER BY release_year ASC;
    \```

5.  A query that returns the columns of `rating` and `total`, tabulating the
    total number of G, PG, PG-13, and R-rated movies.

    \```
    SELECT rating, COUNT(*) AS Total
    FROM movies
    GROUP BY rating;
    \```

6.  A table with columns of `release_year` and `average_runtime`,
    tabulating the average runtime by year for every movie in the database. The data should be in reverse chronological order (i.e. the most recent year should be first).

    \```
    SELECT release_year, AVG(runtime) AS avarage_runtime
    FROM MOVIES
    GROUP BY release_year
    ORDER BY release_year DESC;
    \```

7.  The movie title and studio name for every movie in the
    database.
    \```
    SELECT m.title, s.name AS studio_name
    FROM movies m
    INNER JOIN studios s ON m.studio_id = s.id;
    \```

8.  The star first name, star last name, and movie title for every
    matching movie and star pair in the database.

    \```
    SELECT s.first_name, s.last_name, m.title
    FROM stars s
    INNER JOIN roles r ON s.id = r.star_id
    INNER JOIN movies m ON r.movie_id = m.id;
    \```

9.  The first and last names of every star who has been in a G-rated movie. The first and last name should appear only once for each star, even if they are in several G-rated movies. *IMPORTANT NOTE*: it's possible that there can be two *different* actors with the same name, so make sure your solution accounts for that.

    \```

    SELECT DISTINCT s.first_name, s.last_name
    FROM stars s
    INNER JOI roles r ON s.id = r.star_id
    INNER JOIN movies m ON r.movie_id = m.id
    WHERE m.rating = 'G';
    \```


10. The first and last names of every star along with the number
    of movies they have been in, in descending order by the number of movies. (Similar to #9, make sure
    that two different actors with the same name are considered separately).

    \```
    SELECT  s.first_name, s.last_name, COUNT(r.movie_id) AS movie_count
    FROM stars s
    INNER JOIN roles r ON s.id = r.star_id
    GROUP by s.id, s.first_name, s.last_name
    ORDER BY movie_count DESC;
    \```

### The rest of these are bonuses

11. The title of every movie along with the number of stars in
    that movie, in descending order by the number of stars.

    \```
    SELECT m.title, COUNT(r.star_id) AS star_count
    FROM movies m
    INNER JOIN roles r ON m.id = r.movies_id
    GROUP by m.id, m.title
    ORDER BY star_count DESC;
    \```

12. The first name, last name, and average runtime of the five
    stars whose movies have the longest average.

    \```
    WITH StarMovingAVG AS (
        SELECT s.id, s.first_name, s.last_name, AVG(m.runtime) AS avg_runtime
        FROM stars s
        INNER JOIN roles r ON s.id = r.star_id
        INNER JOIN movies m ON r.movies_id = m.id
        GROUP BY s.id, s.first_name, s.last_name
    )
    SELECT first_name, last_name, avg_runtime
    FROM StarMovieAVG
    ORDER BY avg_runtime DESC
    LIMIT 5;
    \```


13. The first name, last name, and average runtime of the five
    stars whose movies have the longest average, among stars who have more than one movie in the database.
    \```
    WITH StarMovieaVG AS (
        SELECT s.id, s.first_name s.last_name, AVG(m.runtime) AS avg_runtime
        FROM stars s
        INNER JOIN roles r ON s.id = r.star_id
        INNER JOIN movies m ON r.movie_id = m.id
        GROUP BY s.id, s.first_name, s.last_name
    )
    SELECT first_name, last_name, avg_runtime
    FROM starMovieAVG
    WHERE movie_count > 1
    ORDER BY avg_runtime DESC
    LIMIT 5;
    \```

14. The titles of all movies that don't feature any stars in our
    database.

    \```
    SELECT title
    FROM movies
    WHERE id NOT IN (
    SELECT movie_id
    FROM roles
    )
    \```


15. The first and last names of all stars that don't appear in any movies in our database.

    \```
    SELECT first_name, last_name
    FROM stars
    WHERE id NOT IN (
        WELECT star_id
        FROM roles
    )
    \```

16. The first names, last names, and titles corresponding to every
    role in the database, along with every movie title that doesn't have a star, and the first and last names of every star not in a movie.

    \```
    WITH StarMovieRoles AS (
        SELECT s.first_name, s.last_name, m.title
        FROM stars s
        INNER JOIN roles r ON s.id = r.star_id
        INNER JOIN movies m ON r.movies_id = m.id
    ),
    MoviesWithouotStars AS (
        SELECT title
        FROM movies
        WHERE id NOT in (
            SELECT movies_id
            FROM roles
        )
    );
    StarsWithoutMovies AS (
        SELECT first_name, last_name
        FROM stars
        WHERE id NOT in (
            SELECT star_id
            FROM roles
        )
    )
    SELECT * FROM starMovieRoles
    UNION ALL
    SELECT NUL AS first_name, NULL AS last_name, title FROM MoviesWithoutStars
    UNION ALL
    SELECT first_name, last_name, NULL as title FROM StarsWithoutMovies;
    \```