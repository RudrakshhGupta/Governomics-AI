from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# ===========================
# Load Trained Models
# ===========================

success_model = joblib.load("models/success_model.pkl")
gdp_model = joblib.load("models/gdp_model.pkl")
employment_model = joblib.load("models/employment_model.pkl")
risk_model = joblib.load("models/risk_model.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")


# ===========================
# Country Data
# ===========================

country_data = {

    "India": {

        "GDP_Growth": 6.8,
        "Inflation": 4.5,
        "Unemployment": 7.0,
        "Debt_GDP": 82,
        "Political_Stability": 70,
        "Corruption_Index": 40,
        "HDI": 0.64

    },

    "United States": {

        "GDP_Growth": 2.3,
        "Inflation": 2.8,
        "Unemployment": 4.2,
        "Debt_GDP": 121,
        "Political_Stability": 82,
        "Corruption_Index": 69,
        "HDI": 0.93

    }

}


# ===========================
# Prediction Function
# ===========================

def predict_policy(country, policy, budget, duration):

    details = country_data[country]

    # Empty dataframe with trained features

    input_data = pd.DataFrame(
        0,
        index=[0],
        columns=feature_columns
    )

    # Numerical Features

    input_data["Budget_%GDP"] = budget
    input_data["Duration_Years"] = duration
    input_data["GDP_Growth"] = details["GDP_Growth"]
    input_data["Inflation"] = details["Inflation"]
    input_data["Unemployment"] = details["Unemployment"]
    input_data["Debt_GDP"] = details["Debt_GDP"]
    input_data["Political_Stability"] = details["Political_Stability"]
    input_data["Corruption_Index"] = details["Corruption_Index"]
    input_data["HDI"] = details["HDI"]

    # One-Hot Policy Encoding

    policy_column = f"Policy_{policy}"

    if policy_column in input_data.columns:
        input_data[policy_column] = 1

    # Predictions

    success = success_model.predict(input_data)[0]
    gdp = gdp_model.predict(input_data)[0]
    employment = employment_model.predict(input_data)[0]
    risk = risk_model.predict(input_data)[0]

    return {

        "Success Probability": round(float(success), 2),

        "GDP Impact": round(float(gdp), 2),

        "Employment Impact": round(float(employment), 2),

        "Implementation Risk": round(float(risk), 2)

    }


# ===========================
# Routes
# ===========================

@app.route("/")
def home():

    return render_template("index.html")


@app.route("/simulator")
def simulator():

    return render_template("simulator.html")


@app.route("/compare")
def compare():

    return render_template("compare.html")


@app.route("/about")
def about():

    return render_template("about.html")


# ===========================
# Prediction API
# ===========================

@app.route("/predict", methods=["POST"])
def predict():

    country = request.form["country"]

    policy = request.form["policy"]

    budget = float(request.form["budget"])

    duration = int(request.form["duration"])

    result = predict_policy(

        country,

        policy,

        budget,

        duration

    )

    return jsonify(result)


# ===========================
# Run App
# ===========================

if __name__ == "__main__":

    app.run(debug=True)