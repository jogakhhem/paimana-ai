import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# ============================================================
# 1. LOAD DATA
# ============================================================

df = pd.read_csv(
    "data/processed/paimana_features.csv",
    encoding="utf-8-sig"
)

print("Dataset loaded successfully!")
print("Rows:", df.shape[0])
print("Columns:", df.shape[1])


# ============================================================
# 2. COST OVERRUN BASELINE
# ============================================================

cost_data = df[
    [
        "original_cost_cr",
        "cost_overrun_pct"
    ]
].dropna()

X_cost = cost_data[["original_cost_cr"]]
y_cost = cost_data["cost_overrun_pct"]


X_train, X_test, y_train, y_test = train_test_split(
    X_cost,
    y_cost,
    test_size=0.20,
    random_state=42
)


# Simple baseline:
# Predict the average cost overrun from training data

cost_baseline_prediction = np.full(
    len(y_test),
    y_train.mean()
)


cost_mae = mean_absolute_error(
    y_test,
    cost_baseline_prediction
)

cost_rmse = np.sqrt(
    mean_squared_error(
        y_test,
        cost_baseline_prediction
    )
)

cost_r2 = r2_score(
    y_test,
    cost_baseline_prediction
)


print("\n================================")
print("COST OVERRUN BASELINE")
print("================================")

print("Mean prediction:", round(y_train.mean(), 2))
print("MAE:", round(cost_mae, 2))
print("RMSE:", round(cost_rmse, 2))
print("R²:", round(cost_r2, 4))


# ============================================================
# 3. SCHEDULE DELAY BASELINE
# ============================================================

delay_data = df[
    [
        "original_cost_cr",
        "schedule_delay_days"
    ]
].dropna()

X_delay = delay_data[["original_cost_cr"]]
y_delay = delay_data["schedule_delay_days"]


X_train, X_test, y_train, y_test = train_test_split(
    X_delay,
    y_delay,
    test_size=0.20,
    random_state=42
)


# Simple baseline:
# Predict the average schedule delay

delay_baseline_prediction = np.full(
    len(y_test),
    y_train.mean()
)


delay_mae = mean_absolute_error(
    y_test,
    delay_baseline_prediction
)

delay_rmse = np.sqrt(
    mean_squared_error(
        y_test,
        delay_baseline_prediction
    )
)

delay_r2 = r2_score(
    y_test,
    delay_baseline_prediction
)


print("\n================================")
print("SCHEDULE DELAY BASELINE")
print("================================")

print("Mean prediction:", round(y_train.mean(), 2))
print("MAE:", round(delay_mae, 2))
print("RMSE:", round(delay_rmse, 2))
print("R²:", round(delay_r2, 4))


# ============================================================
# 4. SUMMARY
# ============================================================

print("\n================================")
print("BASELINE MODEL SUMMARY")
print("================================")

print(
    f"Cost Overrun MAE: {cost_mae:.2f}%"
)

print(
    f"Cost Overrun RMSE: {cost_rmse:.2f}%"
)

print(
    f"Cost Overrun R²: {cost_r2:.4f}"
)

print(
    f"Schedule Delay MAE: {delay_mae:.2f} days"
)

print(
    f"Schedule Delay RMSE: {delay_rmse:.2f} days"
)

print(
    f"Schedule Delay R²: {delay_r2:.4f}"
)


baseline_results = pd.DataFrame({
    "model": ["Mean Baseline", "Mean Baseline"],
    "target": [
        "Cost Overrun",
        "Schedule Delay"
    ],
    "MAE": [
        cost_mae,
        delay_mae
    ],
    "RMSE": [
        cost_rmse,
        delay_rmse
    ],
    "R2": [
        cost_r2,
        delay_r2
    ]
})


baseline_results.to_csv(
    "data/processed/baseline_results.csv",
    index=False,
    encoding="utf-8-sig"
)

print("\nBaseline results saved successfully!")