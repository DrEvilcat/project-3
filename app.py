#import sqlite3
import numpy as np
import pandas as pd
import random
from flask import Flask, session, render_template, request
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
    return "<h1>This is my test App</h1>"


@app.route("/api/v1.0/stationdata")
def stationdata():
    #Return JSON of station data table
    return pd.read_sql("SELECT * FROM station_data", con=conn).to_json()

@app.route("/api/v1.0/fcst")
def fcst():
    return pd.read_sql("SELECT * FROM fcst", con=conn).to_json()
    #Return fcst data tables
    return 
@app.route("/api/v1.0/obs")
def obs():
    #Return obs data tables
    return pd.read_sql("SELECT * FROM obs", con=conn).to_json() 

@app.route("/api/v1.0/weatherweekly")
def weatherweekly():
     # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    # Visit visitcostarica.herokuapp.com
    url = "http://www.bom.gov.au/"
    browser.visit(url)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")




    if __name__ == "__main__":
        app.run(debug=True)