-- Comments in SQL Start with dash-dash --
-- Query 0
SELECT * FROM analytics;

--1 find the entire record for the app with an id of '1880'
Select * FROM analytics
WHERE id = 1880;

--2 find the id app name for all apps that were last updated on Agust 01, 2018.
SELECT id, app_name FROM analytics
WHERE last_updated = 2018-08-01;

--3 count the number of apps in each category, e.g "family | 1972"
SELECT category, COUNT(*) FROM analytics GROUPED BY category;

--4 Find the top 5 most-reviwed apps and the number of reviews for each.
SELECT * FROM analytics
    ORDER BY reviews DESC
    LIMIT 5;

--5 find the full record of the app that has the most reviewes
    -- with a raitng greater than equal to 4.8

SELECT * FROM analytics
    WHERE rating >= 4.8
    ORDER BY reviews DESC
    LIMIT 1;

--6 Find the avarage rating for each category ordered by the highest rated to lowest rated.
SELECT category, AVG(rating) FROM analytics
    GROUP BY category
    ORDER BY avg DESC;

--7 find the name, price, and rating of the most expensive app with a rating that's less than 3
SELECT app_name, price, rating FROM analytics
    WHERE rating < 3
    ORDER BY price DESC
    LIMIT 1;

--8 find all records with a min install not exceeding 50, that have a rating
-- order your results by highest rated first.
SELECT * FROM analytics
    WHERE min_installs <= 50
    AND rating IS NOT NULL
    ORDER BY rating DESC;

--9 find the names of all apps that are rated less than 3 with at least 10000 reviews.
SELECT app_name FROM analytics
    WHERE rating < 3 AND reviews >= 10000;

--10 frind the top 10 most-reviewed apps that cost between 10c and a dollar.
SELECT * FROM amalytics
    WHERE price BETWEEN 0.1 and 1
    ORDER BY reviews DESC
    LIMIT 10;

--11 find the most out of dadta app.
SELECT * FROM analytics
    WHERE last_updated = (SELECT MIN(last_updated) FROM analytics);

--12 find the most expensive app (the query is very similar to #11)
SELECT * FROM analytics
    WHERE price = (SELECT MAX(price) FROM analytics);

--13 count all the reviews in the Google Play Store.
SELECT SUM(reviews) AS "All the Reviews" FROM analytics;

--14 find all the categories that have more than 300 apps in them
SELECT category FROM analytics
    GROUP BY category
    HAVING COUNT(*) > 300;

--15 find the app that has the highest proportion of reviewes to min_installs,
--among apps that have been installed at least 100,000 times. display the name of the app
--along with the number of reviewes, the min_installs, and teh proportion.

SELECT app_name, reviewes, min_installs, min_installs / reviewes AS proportion
    FROM analytics
    WHERE min_installs >= 100,00
    ORDER BY porportion DESC
    LIMIT 1;
    