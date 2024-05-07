-- regions table

CREATE TABLE regions(
    region_id INT primary KEY,
    region_name VARCHAR(255),
    -- other region information
);

-- User table
CREATE TABLE Users (
    user_id INT primary KEY,
    username VARCHAR(255),
    email VARCHAR (255),
    password_hash VARCHAR(255)
    preferred_region_id INT,
    FOREING KEY (preferred_region_id) REFERENCES Regions(region_id)
    -- other user information
);

-- Posts table
    CREATE TABLE Posts(
        post_id INT PRIMARY KEY
        title VARCHAR(255),
        text TEXT,
        user_id INT,
        location VARCHAR(255),
        region_id INT,
        FOREIGN KEY (user_id) REFERENCES User(user_id),
        FOREIGN KEY (region_id) REFERENCES Regions(region_id)
        -- other post-related information
    );
-- Categories Table
    CREATE TABLE Categories (
        category_id INT Primary KEy,
        category_name VARCHAR(255)
        -- other category-related information
     );
-- Post categories table
CREATE TABLE PostCategories (
    post_id INT,
    category_id INT,
    Primary KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES Post(post_id),
    FOREIGN KEY (category_id)   REFERENCES Categories(category_id)
);