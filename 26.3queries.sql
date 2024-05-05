-- write your queries here
-- first query

SELECT * FROM owners o
    FULL OUTER JOIN vehicles v
    ON o.id=v.OWNER_id;

-- second query
SELECT first_name, last_name,
    COUNT(owner_id) FROM OWNERS o
    JOIN vehicles v ON o.id=v.owner_id
    GROUP BY first_name;

-- third query
SELECT
    first_name, last_name,
    ROUND(AVG(price)) AS avarage_price,
    COUNT (owner_id)
FROM owners o
JOIN vehicels v ON o.id=v.owner_id
GROUP BY
    (first_name, last_name)
    HAVING
        COUNT(OWNER_id) > 1 AND ROUND(AVG(price)) > 10000
    ORDER BY first_name DESC;
