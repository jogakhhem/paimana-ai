import pandas as pd
import numpy as np
from pathlib import Path


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "paimana_risk_scores.csv"
)

OUTPUT_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "paimana_early_warnings.csv"
)


# ============================================================
# LOAD DATA
# ============================================================

print("Loading risk dataset...")

df = pd.read_csv(
    INPUT_PATH,
    encoding="utf-8-sig"
)

print("Rows:", len(df))


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def cost_warning(row):

    value = row["predicted_cost_overrun_pct"]

    if pd.isna(value):
        return "Insufficient data"

    if value > 50:
        return "Critical predicted cost overrun"

    elif value > 25:
        return "High predicted cost overrun"

    elif value > 10:
        return "Moderate predicted cost overrun"

    elif value > 0:
        return "Low predicted cost overrun"

    else:
        return "No predicted cost overrun"


def schedule_warning(row):

    value = row["predicted_schedule_delay_days"]

    if pd.isna(value):
        return "Insufficient data"

    if value > 730:
        return "Critical schedule delay"

    elif value > 365:
        return "High schedule delay"

    elif value > 180:
        return "Moderate schedule delay"

    elif value > 0:
        return "Low schedule delay"

    else:
        return "No predicted schedule delay"


def progress_warning(row):

    value = row["expenditure_progress_gap"]

    if pd.isna(value):
        return "Insufficient data"

    if value > 40:
        return "Critical expenditure-progress mismatch"

    elif value > 20:
        return "High expenditure-progress mismatch"

    elif value > 10:
        return "Moderate expenditure-progress mismatch"

    elif value > 0:
        return "Low expenditure-progress mismatch"

    else:
        return "Progress aligned with expenditure"


def financial_warning(row):

    value = row["expenditure_ratio_pct"]

    if pd.isna(value):
        return "Insufficient data"

    if value > 125:
        return "Critical expenditure level"

    elif value > 100:
        return "High expenditure level"

    elif value > 75:
        return "Moderate expenditure level"

    elif value > 50:
        return "Elevated expenditure level"

    else:
        return "Normal expenditure level"


# ============================================================
# GENERATE WARNINGS
# ============================================================

print("Generating warnings...")

df["cost_warning"] = df.apply(
    cost_warning,
    axis=1
)

df["schedule_warning"] = df.apply(
    schedule_warning,
    axis=1
)

df["progress_warning"] = df.apply(
    progress_warning,
    axis=1
)

df["financial_warning"] = df.apply(
    financial_warning,
    axis=1
)


# ============================================================
# WARNING COUNT
# ============================================================

warning_columns = [
    "cost_warning",
    "schedule_warning",
    "progress_warning",
    "financial_warning"
]

df["warning_count"] = 0

for column in warning_columns:

    df["warning_count"] += (
        ~df[column].str.contains(
            "No predicted|aligned|Normal|Insufficient",
            case=False,
            na=False
        )
    ).astype(int)


# ============================================================
# PRIORITY
# ============================================================

def calculate_priority(row):

    risk = row["risk_score"]
    warnings = row["warning_count"]

    if risk >= 80 or warnings >= 3:
        return "CRITICAL"

    elif risk >= 70 or warnings >= 2:
        return "HIGH"

    elif risk >= 40 or warnings >= 1:
        return "MEDIUM"

    else:
        return "LOW"


df["warning_priority"] = df.apply(
    calculate_priority,
    axis=1
)


# ============================================================
# CREATE HUMAN-READABLE WARNING
# ============================================================

def create_message(row):

    messages = []

    if "predicted cost overrun" in row["cost_warning"].lower():
        messages.append(row["cost_warning"])

    if "schedule delay" in row["schedule_warning"].lower():
        messages.append(row["schedule_warning"])

    if "mismatch" in row["progress_warning"].lower():
        messages.append(row["progress_warning"])

    if "expenditure level" in row["financial_warning"].lower():
        messages.append(row["financial_warning"])

    if len(messages) == 0:
        return "No major warning detected."

    return "; ".join(messages) + "."


df["warning_message"] = df.apply(
    create_message,
    axis=1
)


# ============================================================
# SORT BY PRIORITY
# ============================================================

priority_order = {
    "CRITICAL": 0,
    "HIGH": 1,
    "MEDIUM": 2,
    "LOW": 3
}

df["priority_order"] = df["warning_priority"].map(
    priority_order
)

df = df.sort_values(
    ["priority_order", "risk_score"],
    ascending=[True, False]
)

df = df.drop(
    columns=["priority_order"]
)


# ============================================================
# SAVE
# ============================================================

df.to_csv(
    OUTPUT_PATH,
    index=False,
    encoding="utf-8-sig"
)


# ============================================================
# SUMMARY
# ============================================================

print("\n======================================")
print("EARLY WARNING SYSTEM COMPLETED")
print("======================================")

print("\nWarning Priority:")
print(
    df["warning_priority"]
    .value_counts()
    .sort_index()
)

print("\nTop 10 high-priority projects:")

display_columns = [
    "project_name",
    "risk_score",
    "risk_level",
    "warning_priority",
    "warning_count",
    "warning_message"
]

print(
    df[display_columns]
    .head(10)
    .to_string(index=False)
)

print("\nSaved:")
print(OUTPUT_PATH)