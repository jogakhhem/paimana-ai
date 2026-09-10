# import pandas as pd
# import numpy as np
# import joblib
# import shap
# import matplotlib.pyplot as plt


# # ============================================================
# # 1. LOAD DATA
# # ============================================================

# df = pd.read_csv(
#     "data/processed/paimana_features.csv",
#     encoding="utf-8-sig"
# )

# print("Dataset loaded:", len(df), "projects")


# # ============================================================
# # 2. LOAD MODEL
# # ============================================================

# model = joblib.load(
#     "models/best_cost_overrun_model.pkl"
# )

# imputer = joblib.load(
#     "models/cost_overrun_imputer.pkl"
# )


# # ============================================================
# # 3. FEATURES
# # ============================================================

# features = [
#     "original_cost_cr",
#     "planned_duration_days",
#     "physical_progress_pct",
#     "cumulative_expenditure_cr",
#     "expenditure_ratio_pct",
#     "expenditure_progress_gap"
# ]


# # ============================================================
# # 4. PREPARE DATA
# # ============================================================

# X = df[features].copy()

# X = X.replace(
#     [np.inf, -np.inf],
#     np.nan
# )

# X_imputed = imputer.transform(X)

# X_imputed = pd.DataFrame(
#     X_imputed,
#     columns=features
# )


# # ============================================================
# # 5. CREATE SHAP EXPLAINER
# # ============================================================

# print("\nCreating SHAP explainer...")

# explainer = shap.TreeExplainer(model)

# shap_values = explainer(
#     X_imputed
# )

# print("SHAP calculation completed!")


# # ============================================================
# # 6. GLOBAL FEATURE IMPORTANCE
# # ============================================================

# print("\n================================")
# print("GLOBAL SHAP IMPORTANCE")
# print("================================")

# importance = pd.DataFrame({
#     "feature": features,
#     "mean_abs_shap": np.abs(
#         shap_values.values
#     ).mean(axis=0)
# })

# importance = importance.sort_values(
#     "mean_abs_shap",
#     ascending=False
# )

# print(importance)


# # ============================================================
# # 7. SAVE IMPORTANCE
# # ============================================================

# importance.to_csv(
#     "data/processed/shap_feature_importance.csv",
#     index=False,
#     encoding="utf-8-sig"
# )


# # ============================================================
# # 8. SHAP SUMMARY PLOT
# # ============================================================

# plt.figure()

# shap.summary_plot(
#     shap_values.values,
#     X_imputed,
#     feature_names=features,
#     show=False
# )

# plt.title(
#     "SHAP Feature Importance - Cost Overrun Model"
# )

# plt.tight_layout()

# plt.savefig(
#     "data/processed/shap_summary_cost.png",
#     dpi=300,
#     bbox_inches="tight"
# )

# plt.close()


# print(
#     "\nSHAP summary plot saved successfully!"
# )


# # ============================================================
# # 9. EXPLAIN FIRST PROJECT
# # ============================================================

# project_index = 0

# project_name = df.iloc[
#     project_index
# ]["project_name"]

# project_shap = pd.DataFrame({
#     "feature": features,
#     "shap_value": shap_values.values[
#         project_index
#     ],
#     "feature_value": X_imputed.iloc[
#         project_index
#     ].values
# })

# project_shap["absolute_impact"] = (
#     project_shap["shap_value"]
#     .abs()
# )

# project_shap = project_shap.sort_values(
#     "absolute_impact",
#     ascending=False
# )


# print("\n================================")
# print("PROJECT EXPLANATION")
# print("================================")

# print(
#     "\nProject:",
#     project_name
# )

# print(
#     project_shap[
#         [
#             "feature",
#             "feature_value",
#             "shap_value"
#         ]
#     ].to_string(index=False)
# )


# # ============================================================
# # 10. SAVE PROJECT EXPLANATION
# # ============================================================

# project_shap.to_csv(
#     "data/processed/example_project_explanation.csv",
#     index=False,
#     encoding="utf-8-sig"
# )

# print(
#     "\nProject explanation saved successfully!"
# )

import pandas as pd
import numpy as np
import shap
import joblib
import matplotlib.pyplot as plt
from pathlib import Path

# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "processed" / "paimana_features.csv"
MODEL_PATH = BASE_DIR / "models" / "best_cost_overrun_model.pkl"
IMPUTER_PATH = BASE_DIR / "models" / "cost_overrun_imputer.pkl"

OUTPUT_IMPORTANCE = (
    BASE_DIR / "data" / "processed" / "shap_feature_importance.csv"
)

OUTPUT_EXPLANATION = (
    BASE_DIR / "data" / "processed" / "example_project_explanation.csv"
)

OUTPUT_PLOT = (
    BASE_DIR / "data" / "processed" / "shap_summary_cost.png"
)

# ============================================================
# LOAD DATA
# ============================================================

print("Loading dataset...")

df = pd.read_csv(
    DATA_PATH,
    encoding="utf-8-sig"
)

print("Dataset shape:", df.shape)

# ============================================================
# FEATURES USED BY COST MODEL
# ============================================================

features = [
    "original_cost_cr",
    "planned_duration_days",
    "physical_progress_pct",
    "cumulative_expenditure_cr",
    "expenditure_ratio_pct",
    "expenditure_progress_gap"
]

X = df[features].copy()

# ============================================================
# CLEAN DATA
# ============================================================

X = X.replace([np.inf, -np.inf], np.nan)

# ============================================================
# LOAD MODEL AND IMPUTER
# ============================================================

print("Loading trained model...")

model = joblib.load(MODEL_PATH)
imputer = joblib.load(IMPUTER_PATH)

X_imputed = imputer.transform(X)

X_imputed = pd.DataFrame(
    X_imputed,
    columns=features
)

# ============================================================
# SHAP EXPLAINER
# ============================================================

print("Creating SHAP explainer...")

explainer = shap.TreeExplainer(model)

shap_values = explainer.shap_values(X_imputed)

# ============================================================
# GLOBAL FEATURE IMPORTANCE
# ============================================================

print("\nCalculating feature importance...")

mean_abs_shap = np.abs(shap_values).mean(axis=0)

importance_df = pd.DataFrame({
    "feature": features,
    "mean_absolute_shap": mean_abs_shap
})

importance_df = importance_df.sort_values(
    "mean_absolute_shap",
    ascending=False
)

print("\nSHAP Feature Importance:")
print(importance_df)

importance_df.to_csv(
    OUTPUT_IMPORTANCE,
    index=False,
    encoding="utf-8-sig"
)

# ============================================================
# SHAP SUMMARY PLOT
# ============================================================

print("\nCreating SHAP summary plot...")

plt.figure()

shap.summary_plot(
    shap_values,
    X_imputed,
    show=False
)

plt.tight_layout()

plt.savefig(
    OUTPUT_PLOT,
    dpi=300,
    bbox_inches="tight"
)

plt.close()

print("SHAP summary plot saved:")
print(OUTPUT_PLOT)

# ============================================================
# EXPLAIN FIRST PROJECT
# ============================================================

print("\nExplaining first project...")

project_index = 0

project_shap = shap_values[project_index]

explanation_df = pd.DataFrame({
    "feature": features,
    "feature_value": X_imputed.iloc[project_index].values,
    "shap_value": project_shap
})

explanation_df["impact"] = np.where(
    explanation_df["shap_value"] > 0,
    "Increases predicted cost overrun",
    "Decreases predicted cost overrun"
)

explanation_df["absolute_impact"] = (
    explanation_df["shap_value"].abs()
)

explanation_df = explanation_df.sort_values(
    "absolute_impact",
    ascending=False
)

print("\nProject:", df.iloc[project_index]["project_name"])

print("\nExplanation:")
print(explanation_df)

explanation_df.to_csv(
    OUTPUT_EXPLANATION,
    index=False,
    encoding="utf-8-sig"
)

print("\n======================================")
print("SHAP ANALYSIS COMPLETED")
print("======================================")

print("\nFiles created:")

print(OUTPUT_IMPORTANCE)
print(OUTPUT_PLOT)
print(OUTPUT_EXPLANATION)