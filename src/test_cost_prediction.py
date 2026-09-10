import pandas as pd
import joblib


# ============================================================
# 1. LOAD DATA
# ============================================================

df = pd.read_csv(
    "data/processed/paimana_features.csv",
    encoding="utf-8-sig"
)


# ============================================================
# 2. LOAD MODEL
# ============================================================

model = joblib.load(
    "models/best_cost_overrun_model.pkl"
)

imputer = joblib.load(
    "models/cost_overrun_imputer.pkl"
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
# 4. SELECT PROJECTS
# ============================================================

test_projects = df[
    [
        "project_name",
        "original_cost_cr",
        "planned_duration_days",
        "physical_progress_pct",
        "cumulative_expenditure_cr",
        "expenditure_ratio_pct",
        "expenditure_progress_gap",
        "cost_overrun_pct"
    ]
].dropna(
    subset=features
).head(10)


# ============================================================
# 5. CREATE INPUT
# ============================================================

X = test_projects[features]

X_imputed = imputer.transform(X)


# ============================================================
# 6. PREDICT
# ============================================================

predictions = model.predict(
    X_imputed
)


# ============================================================
# 7. DISPLAY RESULTS
# ============================================================

test_projects["predicted_cost_overrun_pct"] = predictions


print("\n============================================")
print("COST OVERRUN PREDICTIONS")
print("============================================")

print(
    test_projects[
        [
            "project_name",
            "cost_overrun_pct",
            "predicted_cost_overrun_pct"
        ]
    ].to_string(index=False)
)