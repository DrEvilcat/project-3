# project-3

SETUP - Make sure to follow steps in order:
Be sure to fill in postgres username, password, and chosen database name in config-sample.py, then rename to config.py to enable database connections.
Run chema.sql in your database to set up database tables.
Run all cells in the 'Data Import.ipynb' to parse data into the postgres database. 
	This parses the files in the Resources folder - at present, it is a sample containing one day of data per month for a year, taken from:
		https://data.gov.au/data/dataset/rainfall-and-temperature-forecast-and-observations-hourly-verification-2016-05-to-2017-04
	This dashboard can be improved by using the full dataset, simply by dropping the extra files inthe corresponding Resources subfolders.
	The full dataset was NOT used in this version due to large filesize and long processing times.


USING FLASK API:
app.py contains an API to retrieve SQL data in a .json format - run this script, then navigate to localhost:5000/api/v1.0/stationdata for station data. Similar calls can be used
	to retrieve fcst and obs data, as well as a modified table 'var' to show the weather station variance.
Note that this API requires a config file to be filled correctly.

VIEWING DASHBOARD:
Run app.py, then navigate to 'localhost:5000' in your browser (or whatever you have Flask' default server set to). This will take you to a dashboard showing two maps, and a histogram.
The first map is a representation of weather observation stations across australia. Higher density blue, more observation stations, and higher confidence in weather recordings and forecasts
The secon map allows you to easily find and zoom in on your closest weather observation station, and view the estimated annual uncertainty for that station by clicking on the marker.
The histogram shows a distribution of these mean differences - defaults to all national stations, the dropdown menu can be used to filter to a specific state.