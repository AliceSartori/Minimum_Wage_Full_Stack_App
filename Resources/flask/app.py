import numpy as np


from flask import Flask, jsonify, render_template,request
from sqlalchemy import create_engine


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

# 3. Define what to do when a user hits the index route


# @app.route("/")
# def main():
#     return render_template("index_proj2.html")

@app.route("/")
def createhomepage():
    return render_template("project-2-test.html", text="A Historical Examination Throughout the Decades by State")

# @app.route("/map/<year>")
@app.route("/map")
def createmap():
    year = request.args.get('year')
    if(year == None):
        year = 1970

    engine = create_engine('postgresql+psycopg2://alicesartori@localhost/Project_3')
    conn = engine.connect()

    sql_string ='SELECT state, state_minimum_wage, year FROM geography WHERE year=\'%s\'' % (year)
    rows = engine.execute(sql_string).fetchall()

    minimum_wage = []
    state_list = []
    for index, row in enumerate(rows):
        minimum_wage.append(row[1])
        state_list.append(row[0].strip())

    #data2pass = [1,10,20,5,40]
    #trace_x = [1,2,3,4,10]

    print(state_list)
    return render_template("index_alice.html",value=year ,trace_y = minimum_wage , labels=state_list)

@app.route("/barchart")
def createchart():
    # year = request.args.get('year')
    # print(year)
    # if(year == None):
    #     year = 1970
    return render_template("index_latisha.html")


@app.route("/linechart")
def createlinechart():

    return render_template("index_jack.html")

if __name__ == "__main__":
    app.run(debug=True)