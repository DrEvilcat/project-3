DROP TABLE IF EXISTS station_data CASCADE;
DROP TABLE IF EXISTS fcst;
DROP TABLE IF EXISTS obs;
DROP TABLE IF EXISTS variation;

CREATE TABLE station_data (
	station_number INT PRIMARY KEY,
	station_name VARCHAR,
	lat NUMERIC,
	lon NUMERIC,
	height NUMERIC,
	region VARCHAR
);

SELECT * FROM station_data;

CREATE TABLE fcst (
	date VARCHAR,
	station_number INT,
	area_code VARCHAR,
	valid_start BIGINT,
	valid_end BIGINT,
	temperature NUMERIC,
    parameter VARCHAR
);

SELECT * FROM fcst;

CREATE TABLE obs (
	date VARCHAR,
	station_number INT,
	area_code VARCHAR,
	valid_start BIGINT,
	valid_end BIGINT,
	temperature NUMERIC
);

CREATE TABLE variation (
	station_number INT PRIMARY KEY,
	station_name VARCHAR,
	station_difference INT,
	lat NUMERIC,
	lon NUMERIC,
    height NUMERIC,
    region VARCHAR
);	


ALTER TABLE variation ADD CONSTRAINT fk_station_number FOREIGN KEY(station_number) REFERENCES station_data(station_number);

ALTER TABLE obs ADD CONSTRAINT fk_station_number FOREIGN KEY(station_number) REFERENCES station_data(station_number);

ALTER TABLE fcst ADD CONSTRAINT fk_station_number FOREIGN KEY(station_number) REFERENCES station_data(station_number);