import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    return render_template("project-2-test.html", text="A Historical Examination Throughout the Decades by State")

@app.route("/alice")
def test():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
