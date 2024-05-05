-- fs1 find the name andrating of the top rated apps in each category
-- among apps thta have been installed at least 50,000 times

SELECT app_name, rating, category FROM analytics
    WHERE (rating, category) IN (
        SELECT MAX (rating), category FROM analytics
        WHERE min_installs >= 50000
        GROUP BY category
    )
ORDER BY category;

-- FS2 Find all the apps that have a name similar to "facebook"
SELECT FROM analytics
    WHERE app_name ILIKE '%facebook%'

-- FS3 FInd all the apps that have more than 1 genre
SELECT * FROM analytics
    WHERE array_length(generes, 1) = 2;

-- FS4 find all the apps that have education as one of their genres.
SELECT * FROM analytics
    WHERE genres @> '{"Education"}';
