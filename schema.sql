DROP TABLE IF EXISTS station_data;
DROP TABLE IF EXISTS fcst;
DROP TABLE IF EXISTS obs;

CREATE TABLE station_data (
	station_number INT PRIMARY KEY,
	station_name VARCHAR,
	lat NUMERIC,
	lon NUMERIC,
	height NUMERIC,
	region VARCHAR
);

CREATE TABLE fcst (
	date VARCHAR,
	station_number INT,
	area_code VARCHAR,
	valid_start BIGINT,
	valid_end BIGINT,
	temperature NUMERIC
);

CREATE TABLE obs (
	date VARCHAR,
	station_number INT,
	area_code VARCHAR,
	valid_start BIGINT,
	valid_end BIGINT,
	temperature NUMERIC
);


ALTER TABLE obs ADD CONSTRAINT fk_station_number FOREIGN KEY(station_number) REFERENCES station_data(station_number);

ALTER TABLE fcst ADD CONSTRAINT fk_station_number FOREIGN KEY(station_number) REFERENCES station_data(station_number);