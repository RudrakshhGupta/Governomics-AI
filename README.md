# Governomics-v1
Governomics is an AI-powered public policy simulation platform that leverages machine learning to predict the potential impact of government policies before implementation. Built with Flask, Scikit-learn, and Bootstrap, it enables evidence-driven policy analysis through an interactive web interface.

# Governomics — Simulate Before You Implement

<p align="center">
  <strong>AI-Powered Public Policy Simulation Platform</strong><br>
  Predict the potential impact of government policies before implementation using Machine Learning.
</p>

---

## Overview

Governomics is an AI-powered web application that enables users to simulate and evaluate the potential outcomes of government policies before they are implemented.

The platform combines Machine Learning with macroeconomic indicators to estimate the impact of different policy decisions on economic growth, employment, implementation risk, and overall policy success.

Rather than relying solely on intuition or lengthy economic analysis, Governomics provides data-driven predictions within seconds through an intuitive and modern web interface.

---

## Features

- AI-powered policy simulation
- Predicts policy success probability
- GDP impact estimation
- Employment impact prediction
- Policy implementation risk analysis
- Interactive policy simulator
- Policy comparison interface
- Responsive and modern UI
- Machine Learning powered backend
- Flask-based web application

---

## Machine Learning Pipeline

Governomics uses supervised Machine Learning models trained on a synthetic dataset generated using realistic macroeconomic indicators.

### Input Features

- Country
- Policy Type
- Budget Allocation (% GDP)
- Duration (Years)
- GDP Growth
- Inflation
- Unemployment
- Debt-to-GDP Ratio
- Political Stability
- Corruption Index
- Human Development Index (HDI)

### Model Predictions

- Success Probability
- GDP Impact
- Employment Impact
- Implementation Risk

Multiple regression models are trained independently for each prediction, allowing the simulator to estimate different aspects of policy performance.

---

## Current Supported Countries

- India
- United States

> The current version officially supports these countries. The platform has been designed to easily accommodate additional countries by extending the training dataset and updating the country feature database.

---

## Current Supported Policy Categories

- Education
- Healthcare
- Infrastructure
- Renewable Energy
- Tax Reform

---

## Technology Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Lucide Icons

### Backend

- Python
- Flask

### Machine Learning

- Scikit-Learn
- Pandas
- NumPy
- Joblib

---

## Project Structure

```text
Governomics
│
├── app.py
├── train_model.py
├── synthetic_dataset.csv
│
├── models/
│   ├── success_model.pkl
│   ├── gdp_model.pkl
│   ├── employment_model.pkl
│   ├── risk_model.pkl
│   └── feature_columns.pkl
│
├── static/
│   ├── css/
│   ├── image/
│   └── js/
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── simulator.html
│   ├── compare.html
│   ├── about.html
│   └── components/
│
└── README.md
```

---

## Repository Note

The repository includes the **synthetic training dataset** used to build the Machine Learning models.

However, the trained model files (`*.pkl`) have **not been uploaded** because their combined size exceeds GitHub's file size limits.

To run the project successfully, you can:

- Retrain the models locally using the provided `train_model.py` script, or
- Place your own trained models inside the `models/` directory.

The following files are expected inside the `models/` folder:

```text
success_model.pkl
gdp_model.pkl
employment_model.pkl
risk_model.pkl
feature_columns.pkl
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Governomics.git
```

Navigate to the project directory

```bash
cd Governomics
```

Install dependencies

```bash
pip install -r requirements.txt
```

Train the models

```bash
python train_model.py
```

Run the Flask application

```bash
python app.py
```

Open your browser

```
http://127.0.0.1:5000
```

---

## Screenshots

- Homepage <img width="1900" height="917" alt="image" src="https://github.com/user-attachments/assets/68696630-7828-4060-b487-f33d0bbf2e27" />

- Policy Simulator <img width="1892" height="930" alt="image" src="https://github.com/user-attachments/assets/20a062ea-a658-4b40-ac9b-a56632e8f822" />

- Compare Policies <img width="1895" height="911" alt="image" src="https://github.com/user-attachments/assets/e53bb8cf-532a-4685-8e8b-6d729fc07334" />

- Prediction Results <img width="561" height="732" alt="image" src="https://github.com/user-attachments/assets/375c7340-4d39-483c-a829-efffa5323ae5" />


---

## Future Improvements

- Support for additional countries
- More policy categories
- Larger training dataset
- Explainable AI (XAI)
- Interactive data visualizations
- PDF report generation
- Policy recommendation engine
- Historical policy analysis
- Cloud deployment
- User authentication

---

## Disclaimer

Governomics is intended for educational, research, and demonstration purposes.

The predictions generated by the platform are based on Machine Learning models trained on synthetic data and should not be interpreted as official economic or governmental policy recommendations.

---

## Author

**Rudraksh Gupta**

Indian Institute of Information Technology, Nagpur

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

This project was built using several outstanding open-source technologies, including:

- Flask
- Jsons 
- Scikit-Learn
- Pandas
- NumPy
- Bootstrap
- Joblib
- Lucide Icons

Special thanks to the open-source community for making these tools freely available.
