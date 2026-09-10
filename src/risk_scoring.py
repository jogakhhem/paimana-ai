import pandas as pd
import numpy as np
import joblib


# ============================================================
# 1. LOAD DATA
# ============================================================

df = pd.read_csv(
    "data/processed/paimana_features.csv",
    encoding="utf-8-sig"
)

print("Dataset loaded:", len(df), "projects")


# ============================================================
# 2. LOAD MODELS
# ============================================================

cost_model = joblib.load(
    "models/best_cost_overrun_model.pkl"
)

cost_imputer = joblib.load(
    "models/cost_overrun_imputer.pkl"
)

time_model = joblib.load(
    "models/best_time_overrun_model.pkl"
)

time_imputer = joblib.load(
    "models/time_overrun_imputer.pkl"
)


# ============================================================
# 3. FEATURES
# ============================================================

features = [
    "original_cost_cr",
    "planned_duration_days",
    "physical_progress_pct",
    "cumulative_expenditure_cr",
    "expenditure_ratio_pct",
    "expenditure_progress_gap"
]


# ============================================================
# 4. PREPARE FEATURES
# ============================================================

X = df[features].copy()

X = X.replace(
    [np.inf, -np.inf],
    np.nan
)


# ============================================================
# 5. IMPUTE MISSING VALUES
# ============================================================

X_cost = cost_imputer.transform(X)

X_time = time_imputer.transform(X)


# ============================================================
# 6. PREDICT COST OVERRUN
# ============================================================

df["predicted_cost_overrun_pct"] = (
    cost_model.predict(X_cost)
)


# ============================================================
# 7. PREDICT SCHEDULE DELAY
# ============================================================

df["predicted_schedule_delay_days"] = (
    time_model.predict(X_time)
)


# ============================================================
# 8. COST RISK SCORE
# ============================================================

def cost_risk(value):

    if value <= 0:
        return 0

    elif value <= 10:
        return 25

    elif value <= 25:
        return 60

    elif value <= 50:
        return 80

    else:
        return 100


df["cost_risk_score"] = (
    df["predicted_cost_overrun_pct"]
    .apply(cost_risk)
)


# ============================================================
# 9. SCHEDULE RISK SCORE
# ============================================================

def schedule_risk(value):

    if value <= 0:
        return 0

    elif value <= 180:
        return 25

    elif value <= 365:
        return 60

    elif value <= 730:
        return 80

    else:
        return 100


df["schedule_risk_score"] = (
    df["predicted_schedule_delay_days"]
    .apply(schedule_risk)
)


# ============================================================
# 10. PROGRESS RISK
# ============================================================

def progress_risk(value):

    if pd.isna(value):
        return 50

    elif value <= 0:
        return 0

    elif value <= 10:
        return 25

    elif value <= 20:
        return 60

    elif value <= 40:
        return 80

    else:
        return 100


df["progress_risk_score"] = (
    df["expenditure_progress_gap"]
    .apply(progress_risk)
)


# ============================================================
# 11. FINANCIAL RISK
# ============================================================

def financial_risk(value):

    if pd.isna(value):
        return 50

    elif value <= 50:
        return 0

    elif value <= 75:
        return 25

    elif value <= 100:
        return 60

    elif value <= 125:
        return 80

    else:
        return 100


df["financial_risk_score"] = (
    df["expenditure_ratio_pct"]
    .apply(financial_risk)
)


# ============================================================
# 12. UNIFIED RISK SCORE
# ============================================================

df["risk_score"] = (

    0.30 * df["cost_risk_score"]

    + 0.30 * df["schedule_risk_score"]

    + 0.20 * df["progress_risk_score"]

    + 0.20 * df["financial_risk_score"]

)


# ============================================================
# 13. RISK LEVEL
# ============================================================

def risk_level(score):

    if score < 40:
        return "LOW"

    elif score < 70:
        return "MEDIUM"

    else:
        return "HIGH"


df["risk_level"] = (
    df["risk_score"]
    .apply(risk_level)
)


# ============================================================
# 14. DISPLAY RESULTS
# ============================================================

result_columns = [
    "project_name",
    "sector",
    "predicted_cost_overrun_pct",
    "predicted_schedule_delay_days",
    "cost_risk_score",
    "schedule_risk_score",
    "progress_risk_score",
    "financial_risk_score",
    "risk_score",
    "risk_level"
]

print("\n============================================")
print("PROJECT RISK RESULTS")
print("============================================")

print(
    df[result_columns]
    .head(20)
    .to_string(index=False)
)


# ============================================================
# 15. RISK SUMMARY
# ============================================================

print("\n============================================")
print("RISK LEVEL SUMMARY")
print("============================================")

print(
    df["risk_level"]
    .value_counts()
)


# ============================================================
# 16. SAVE
# ============================================================

df.to_csv(
    "data/processed/paimana_risk_scores.csv",
    index=False,
    encoding="utf-8-sig"
)

print(
    "\nRisk scoring completed successfully!"
)

print(
    "Saved to:",
    "data/processed/paimana_risk_scores.csv"
)