import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

from xgboost import XGBRegressor

import joblib


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
# 2. SELECT FEATURES
# ============================================================

features = [
    "original_cost_cr",
    "planned_duration_days",
    "physical_progress_pct",
    "cumulative_expenditure_cr",
    "expenditure_ratio_pct",
    "expenditure_progress_gap"
]

target = "cost_overrun_pct"


# ============================================================
# 3. CREATE X AND y
# ============================================================

data = df[features + [target]].copy()

data = data.replace(
    [np.inf, -np.inf],
    np.nan
)

data = data.dropna(
    subset=[target]
)

X = data[features]
y = data[target]


print("\nFeatures:")
print(features)

print("\nTarget:")
print(target)

print("\nTraining rows:", len(data))


# ============================================================
# 4. TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)


# ============================================================
# 5. HANDLE MISSING VALUES
# ============================================================

imputer = SimpleImputer(
    strategy="median"
)

X_train = imputer.fit_transform(X_train)

X_test = imputer.transform(X_test)


# ============================================================
# 6. CREATE MODELS
# ============================================================

models = {

    "Linear Regression": LinearRegression(),

    "Random Forest": RandomForestRegressor(
        n_estimators=300,
        random_state=42,
        n_jobs=-1
    ),

    "XGBoost": XGBRegressor(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        objective="reg:squarederror"
    )
}


# ============================================================
# 7. TRAIN AND EVALUATE
# ============================================================

results = []

trained_models = {}


for name, model in models.items():

    print("\n--------------------------------")
    print("Training:", name)
    print("--------------------------------")

    model.fit(
        X_train,
        y_train
    )

    predictions = model.predict(
        X_test
    )

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    rmse = np.sqrt(
        mean_squared_error(
            y_test,
            predictions
        )
    )

    r2 = r2_score(
        y_test,
        predictions
    )

    results.append({
        "model": name,
        "MAE": mae,
        "RMSE": rmse,
        "R2": r2
    })

    trained_models[name] = model

    print("MAE :", round(mae, 3))
    print("RMSE:", round(rmse, 3))
    print("R²  :", round(r2, 3))


# ============================================================
# 8. MODEL COMPARISON
# ============================================================

results_df = pd.DataFrame(results)

results_df = results_df.sort_values(
    "RMSE"
)

print("\n================================")
print("MODEL COMPARISON")
print("================================")

print(results_df)


# ============================================================
# 9. SELECT BEST MODEL
# ============================================================

best_model_name = results_df.iloc[0]["model"]

best_model = trained_models[
    best_model_name
]

print("\nBest Model:", best_model_name)


# ============================================================
# 10. SAVE RESULTS
# ============================================================

results_df.to_csv(
    "data/processed/cost_model_results.csv",
    index=False,
    encoding="utf-8-sig"
)


# ============================================================
# 11. SAVE BEST MODEL
# ============================================================

joblib.dump(
    best_model,
    "models/best_cost_overrun_model.pkl"
)

joblib.dump(
    imputer,
    "models/cost_overrun_imputer.pkl"
)


print("\nModels saved successfully!")

print(
    "Best model saved as:",
    "models/best_cost_overrun_model.pkl"
)

# ============================================================
# 12. FEATURE IMPORTANCE
# ============================================================

if best_model_name in ["Random Forest", "XGBoost"]:

    importance = best_model.feature_importances_

    feature_importance = pd.DataFrame({
        "feature": features,
        "importance": importance
    })

    feature_importance = feature_importance.sort_values(
        "importance",
        ascending=False
    )

    print("\n================================")
    print("FEATURE IMPORTANCE")
    print("================================")

    print(feature_importance)


    feature_importance.to_csv(
        "data/processed/cost_feature_importance.csv",
        index=False,
        encoding="utf-8-sig"
    )

    print(
        "\nFeature importance saved successfully!"
    )