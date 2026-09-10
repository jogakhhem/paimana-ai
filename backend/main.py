# from fastapi import FastAPI
# import pandas as pd
# from pathlib import Path


# # ============================================================
# # APP
# # ============================================================

# app = FastAPI(
#     title="PAIMANA AI Project Monitoring API",
#     description="AI-powered infrastructure project monitoring and early warning system",
#     version="1.0.0"
# )


# # ============================================================
# # PATH
# # ============================================================

# BASE_DIR = Path(__file__).resolve().parent.parent

# DATA_PATH = (
#     BASE_DIR
#     / "data"
#     / "processed"
#     / "paimana_early_warnings.csv"
# )


# # ============================================================
# # LOAD DATA
# # ============================================================

# df = pd.read_csv(
#     DATA_PATH,
#     encoding="utf-8-sig"
# )


# # ============================================================
# # ROOT
# # ============================================================

# @app.get("/")
# def root():

#     return {
#         "message": "PAIMANA AI API is running",
#         "projects": len(df),
#         "status": "online"
#     }


# # ============================================================
# # HEALTH CHECK
# # ============================================================

# @app.get("/health")
# def health():

#     return {
#         "status": "healthy",
#         "projects_loaded": len(df)
#     }


# # ============================================================
# # PROJECT COUNT
# # ============================================================

# @app.get("/projects/count")
# def project_count():

#     return {
#         "total_projects": len(df)
#     }


# # ============================================================
# # PROJECT LIST
# # ============================================================

# @app.get("/projects")
# def get_projects():

#     columns = [
#         "project_name",
#         "ministry_department",
#         "sector",
#         "state",
#         "original_cost_cr",
#         "revised_cost_cr",
#         "physical_progress_pct",
#         "risk_score",
#         "risk_level",
#         "warning_priority",
#         "warning_count",
#         "warning_message"
#     ]

#     available_columns = [
#         column
#         for column in columns
#         if column in df.columns
#     ]

#     projects = (
#         df[available_columns]
#         .fillna("")
#         .to_dict(orient="records")
#     )

#     return {
#         "count": len(projects),
#         "projects": projects
#     }


# # ============================================================
# # HIGH RISK PROJECTS
# # ============================================================

# @app.get("/projects/high-risk")
# def high_risk_projects():

#     result = df[
#         df["warning_priority"].isin(
#             ["CRITICAL", "HIGH"]
#         )
#     ]

#     result = result.sort_values(
#         "risk_score",
#         ascending=False
#     )

#     columns = [
#         "project_name",
#         "ministry_department",
#         "sector",
#         "state",
#         "risk_score",
#         "risk_level",
#         "warning_priority",
#         "warning_count",
#         "warning_message"
#     ]

#     available_columns = [
#         column
#         for column in columns
#         if column in result.columns
#     ]

#     projects = (
#         result[available_columns]
#         .fillna("")
#         .to_dict(orient="records")
#     )

#     return {
#         "count": len(projects),
#         "projects": projects
#     }


# # ============================================================
# # RISK SUMMARY
# # ============================================================

# @app.get("/risk-summary")
# def risk_summary():

#     risk_counts = (
#         df["risk_level"]
#         .value_counts()
#         .to_dict()
#     )

#     warning_counts = (
#         df["warning_priority"]
#         .value_counts()
#         .to_dict()
#     )

#     return {
#         "risk_levels": risk_counts,
#         "warning_priorities": warning_counts
#     }
import os
import numpy as np
import pandas as pd
import shap
import joblib
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
import pandas as pd
from pathlib import Path
from pydantic import BaseModel
 



# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="PAIMANA AI Project Monitoring API",
    description="AI-powered infrastructure project monitoring and early warning system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://paimana-ai-five.vercel.app"
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# SHAP / ML FEATURES
# ==============================

FEATURES = [
    "original_cost_cr",
    "planned_duration_days",
    "physical_progress_pct",
    "cumulative_expenditure_cr",
    "expenditure_ratio_pct",
    "expenditure_progress_gap"
]

FEATURE_LABELS = {
    "original_cost_cr": "Original Project Cost",
    "planned_duration_days": "Planned Duration",
    "physical_progress_pct": "Physical Progress",
    "cumulative_expenditure_cr": "Cumulative Expenditure",
    "expenditure_ratio_pct": "Expenditure Ratio",
    "expenditure_progress_gap": "Expenditure-Progress Gap"
}


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "paimana_early_warnings.csv"
)

SHAP_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "shap_feature_importance.csv"
)

# ==============================
# FILE PATHS
# ==============================

MODEL_PATH = "models/best_cost_overrun_model.pkl"
IMPUTER_PATH = "models/cost_overrun_imputer.pkl"
FEATURE_DATA_PATH = "data/processed/paimana_features.csv"


# ==============================
# LOAD MODEL
# ==============================

cost_model = None
cost_imputer = None
feature_df = None
shap_explainer = None


if os.path.exists(MODEL_PATH) and os.path.exists(IMPUTER_PATH):


    cost_model = joblib.load(MODEL_PATH)
    cost_imputer = joblib.load(IMPUTER_PATH)

    print("Cost model loaded successfully.")

    shap_explainer = shap.TreeExplainer(cost_model)


if os.path.exists(FEATURE_DATA_PATH):

    feature_df = pd.read_csv(FEATURE_DATA_PATH)

    print("Feature dataset loaded:")
    print(feature_df.shape)
# ============================================================
# LOAD DATA
# ============================================================

df = pd.read_csv(
    DATA_PATH,
    encoding="utf-8-sig"
)


# ============================================================
# HELPER
# ============================================================

def clean_records(dataframe):
    """
    Convert NaN values to empty strings so that
    the API returns valid JSON.
    """
    return dataframe.fillna("").to_dict(
        orient="records"
    )


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "PAIMANA AI API is running",
        "projects": len(df),
        "status": "online"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "projects_loaded": len(df)
    }


# ============================================================
# PROJECT COUNT
# ============================================================

@app.get("/projects/count")
def project_count():

    return {
        "total_projects": len(df)
    }


# ============================================================
# ALL PROJECTS
# ============================================================

@app.get("/projects")
def get_projects():

    columns = [
        "project_code",
        "project_name",
        "ministry_department",
        "sector",
        "agency",
        "state",
        "original_cost_cr",
        "revised_cost_cr",
        "cumulative_expenditure_cr",
        "physical_progress_pct",
        "predicted_cost_overrun_pct",
        "predicted_schedule_delay_days",
        "risk_score",
        "risk_level",
        "warning_priority",
        "warning_count",
        "warning_message"
    ]

    available_columns = [
        column
        for column in columns
        if column in df.columns
    ]

    result = df[available_columns]

    return {
        "count": len(result),
        "projects": clean_records(result)
    }


# ============================================================
# HIGH RISK PROJECTS
# ============================================================

@app.get("/projects/high-risk")
def high_risk_projects():

    result = df[
        df["warning_priority"].isin(
            ["CRITICAL", "HIGH"]
        )
    ]

    result = result.sort_values(
        "risk_score",
        ascending=False
    )

    columns = [
        "project_code",
        "project_name",
        "ministry_department",
        "sector",
        "state",
        "risk_score",
        "risk_level",
        "warning_priority",
        "warning_count",
        "warning_message"
    ]

    available_columns = [
        column
        for column in columns
        if column in result.columns
    ]

    result = result[available_columns]

    return {
        "count": len(result),
        "projects": clean_records(result)
    }


# ============================================================
# CRITICAL WARNINGS
# ============================================================

@app.get("/warnings/critical")
def critical_warnings():

    result = df[
        df["warning_priority"] == "CRITICAL"
    ]

    result = result.sort_values(
        "risk_score",
        ascending=False
    )

    columns = [
        "project_code",
        "project_name",
        "state",
        "sector",
        "risk_score",
        "warning_count",
        "warning_message"
    ]

    available_columns = [
        column
        for column in columns
        if column in result.columns
    ]

    result = result[available_columns]

    return {
        "count": len(result),
        "warnings": clean_records(result)
    }


# ============================================================
# RISK SUMMARY
# ============================================================

@app.get("/risk-summary")
def risk_summary():

    risk_counts = (
        df["risk_level"]
        .value_counts()
        .to_dict()
    )

    warning_counts = (
        df["warning_priority"]
        .value_counts()
        .to_dict()
    )

    return {
        "risk_levels": risk_counts,
        "warning_priorities": warning_counts
    }


# ============================================================
# SECTOR ANALYTICS
# ============================================================

@app.get("/analytics/sectors")
def sector_analytics():

    result = (
        df.groupby("sector")
        .agg(
            projects=("project_name", "count"),
            average_risk=("risk_score", "mean"),
            average_cost_overrun=(
                "predicted_cost_overrun_pct",
                "mean"
            ),
            average_schedule_delay=(
                "predicted_schedule_delay_days",
                "mean"
            )
        )
        .reset_index()
        .sort_values(
            "average_risk",
            ascending=False
        )
    )

    return {
        "count": len(result),
        "sectors": clean_records(result)
    }


# ============================================================
# STATE ANALYTICS
# ============================================================

@app.get("/analytics/states")
def state_analytics():

    result = (
        df.groupby("state")
        .agg(
            projects=("project_name", "count"),
            average_risk=("risk_score", "mean"),
            average_cost_overrun=(
                "predicted_cost_overrun_pct",
                "mean"
            ),
            average_schedule_delay=(
                "predicted_schedule_delay_days",
                "mean"
            )
        )
        .reset_index()
        .sort_values(
            "average_risk",
            ascending=False
        )
    )

    return {
        "count": len(result),
        "states": clean_records(result)
    }


# ============================================================
# MINISTRY ANALYTICS
# ============================================================

@app.get("/analytics/ministries")
def ministry_analytics():

    result = (
        df.groupby("ministry_department")
        .agg(
            projects=("project_name", "count"),
            average_risk=("risk_score", "mean"),
            average_cost_overrun=(
                "predicted_cost_overrun_pct",
                "mean"
            ),
            average_schedule_delay=(
                "predicted_schedule_delay_days",
                "mean"
            )
        )
        .reset_index()
        .sort_values(
            "average_risk",
            ascending=False
        )
    )

    return {
        "count": len(result),
        "ministries": clean_records(result)
    }


# ============================================================
# SHAP FEATURE IMPORTANCE
# ============================================================

@app.get("/analytics/shap")
def shap_importance():

    if not SHAP_PATH.exists():

        raise HTTPException(
            status_code=404,
            detail="SHAP feature importance file not found"
        )

    shap_df = pd.read_csv(
        SHAP_PATH,
        encoding="utf-8-sig"
    )

    return {
        "features": clean_records(shap_df)
    }


# ============================================================
# PROJECT SEARCH
# ============================================================

@app.get("/projects/search")
def search_projects(q: str):

    if not q.strip():

        raise HTTPException(
            status_code=400,
            detail="Search query cannot be empty"
        )

    query = q.lower()

    mask = (
        df["project_name"]
        .fillna("")
        .str.lower()
        .str.contains(query, regex=False)
    )

    result = df[mask]

    columns = [
        "project_code",
        "project_name",
        "ministry_department",
        "sector",
        "state",
        "risk_score",
        "risk_level",
        "warning_priority",
        "warning_message"
    ]

    available_columns = [
        column
        for column in columns
        if column in result.columns
    ]

    result = result[available_columns]

    return {
        "query": q,
        "count": len(result),
        "projects": clean_records(result)
    }


# ============================================================
# PROJECT BY CODE
# ============================================================

@app.get("/projects/{project_code}/explanation")
def get_project_explanation(project_code: str):

    if cost_model is None or cost_imputer is None:
        raise HTTPException(
            status_code=500,
            detail="Cost model is not available."
        )

    if feature_df is None:
        raise HTTPException(
            status_code=500,
            detail="Feature dataset is not available."
        )

    project = feature_df[
        feature_df["project_code"].astype(str) == str(project_code)
    ]

    if project.empty:
        raise HTTPException(
            status_code=404,
            detail="Project not found."
        )

    project = project.iloc[[0]]

    X = project[FEATURES].copy()

    X = X.replace([np.inf, -np.inf], np.nan)

    X_imputed = cost_imputer.transform(X)

    prediction = float(cost_model.predict(X_imputed)[0])

    if shap_explainer is None:
        raise HTTPException(
            status_code=500,
            detail="SHAP explainer is not available."
        )

    shap_values = shap_explainer.shap_values(X_imputed)

    shap_values = np.asarray(shap_values)

    if shap_values.ndim == 2:
        shap_values = shap_values[0]

    explanations = []

    for feature, value, shap_value in zip(
        FEATURES,
        X.iloc[0].values,
        shap_values
    ):

        explanations.append({
            "feature": feature,
            "label": FEATURE_LABELS.get(feature, feature),
            "value": None if pd.isna(value) else float(value),
            "shap_value": float(shap_value),
            "direction": (
                "increases"
                if shap_value > 0
                else "decreases"
            ),
            "impact": abs(float(shap_value))
        })

    explanations = sorted(
        explanations,
        key=lambda x: x["impact"],
        reverse=True
    )

    return {
        "project_code": str(project_code),
        "project_name": project.iloc[0]["project_name"],
        "predicted_cost_overrun_pct": prediction,
        "explanations": explanations
    }



@app.get("/projects/{project_code}")
def get_project(project_code: str):

    result = df[
        df["project_code"]
        .astype(str)
        .str.lower()
        == project_code.lower()
    ]

    if result.empty:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return clean_records(result.iloc[[0]])[0]


# @app.get("/projects")
# def get_projects():

#     records = df.to_dict(
#         orient="records"
#     )

#     return clean_records(records)