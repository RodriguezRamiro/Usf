CREATE TABLE Teams (
    team_id INT PRIMARY KEY,
    team_name VARCHAR(255)
    -- other relevant team information
);

-- Players table
CREATE TABLE Players (
    player_id INT PRIMARY KEY,
    player_name VARCHAR(255),
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
    -- other relevant player information
);

-- Matches table
CREATE TABLE Matches (
    match_id INT PRIMARY KEY,
    home_team_id INT,
    away_team_id INT,
    match_date DATE,
    FOREIGN KEY (home_team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (away_team_id) REFERENCES Teams(team_id)
    -- other match-related information
);

-- Goals table
CREATE TABLE Goals (
    goal_id INT PRIMARY KEY,
    match_id INT,
    player_id INT,
    goal_time TIME,
    FOREIGN KEY (match_id) REFERENCES Matches(match_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
    -- other goal-related information
);

-- Referees table
CREATE TABLE Referees (
    referee_id INT PRIMARY KEY,
    referee_name VARCHAR(255)
    -- other relevant referee information
);

-- Seasons table
CREATE TABLE Seasons (
    season_id INT PRIMARY KEY,
    league_name VARCHAR(255),
    start_date DATE,
    end_date DATE
    -- other season-related information
);