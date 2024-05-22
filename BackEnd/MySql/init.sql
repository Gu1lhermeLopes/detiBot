USE Detibot;

-- Creates update_time table
CREATE TABLE IF NOT EXISTS update_time (
    id INT PRIMARY KEY,
    period_date VARCHAR(20),
    update_period VARCHAR(30)
);

-- Creates source table
CREATE TABLE IF NOT EXISTS url_source (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_link VARCHAR(255),
    paths VARCHAR(255),
    descript VARCHAR(255),
    wait_time INT,
    recursive_url BOOLEAN,
    update_period_id INT,
    FOREIGN KEY (update_period_id) REFERENCES update_time (id)
);

-- Creates source table
CREATE TABLE IF NOT EXISTS file_source (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    loader_type VARCHAR(255),
    descript VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS faq_source (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255),
    answer VARCHAR(255)
);

-- inserts the predefined rows of update_time
INSERT INTO update_time (id,period_date, update_period) VALUES (1,'Daily', '2024-03-22 00:00:00');
INSERT INTO update_time (id,period_date, update_period) VALUES (2,'Weekly', '2024-03-22 00:00:00');
INSERT INTO update_time (id,period_date, update_period) VALUES (3,'Monthly', '2024-03-22 00:00:00');
INSERT INTO update_time (id,period_date, update_period) VALUES (4,'Quarter', '2024-03-22 00:00:00');


