#import sqlite3
import numpy as np
import pandas as pd
import random
from flask import Flask, session, render_template, request, jsonify
from sqlalchemy import create_engine
import datetime
import config
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
from webdriver_manager.chrome import ChromeDriverManager
import requests

# connect to SQL database 

protocol = 'postgresql'
username = config.username
password = config.password
host = 'localhost'
port = 5432
database_name = config.database_name
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)
conn = engine.connect()



app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/v1.0/stationdata")
def stationdata():
    #Return JSON of station data table
    return jsonify(pd.read_sql("SELECT * FROM station_data", con=conn).to_json())

@app.route("/api/v1.0/fcst")
def fcst():
    return pd.read_sql("SELECT * FROM fcst", con=conn).to_json()
    #Return fcst data tables

@app.route("/api/v1.0/obs")
def obs():
    #Return obs data tables
    return pd.read_sql("SELECT * FROM obs", con=conn).to_json() 

@app.route("/api/v1.0/var")
def var():
    #Return obs data tables
    return pd.read_sql("SELECT * FROM variation", con=conn).to_json() 



if __name__ == "__main__":
    app.run(debug=True)


#, methods=['GET'], strict_slashes=False