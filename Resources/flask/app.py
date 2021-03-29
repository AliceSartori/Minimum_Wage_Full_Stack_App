import numpy as np


from flask import Flask, jsonify, render_template,request

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

# 3. Define what to do when a user hits the index route


# @app.route("/")
# def main():
#     return render_template("index_proj2.html")

@app.route("/")
def test4():
    return render_template("project-2-test.html", text="A Historical Examination Throughout the Decades by State")

@app.route("/map")
def test():

    # year = request.args.get('year')

    # if(year == None):
    #     year = 1970

    return render_template("index.html")

@app.route("/barchart")
def test2():
    # year = request.args.get('year')
    # print(year)
    # if(year == None):
    #     year = 1970
    return render_template("index7.html")

# @app.route("/jack")
# def test3():
#     return render_template("index7.html")

if __name__ == "__main__":
    app.run(debug=True)