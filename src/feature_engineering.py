import pandas as pd
import numpy as np

INPUT_FILE = "data/processed/paimana_clean.csv"
OUTPUT_FILE = "data/processed/paimana_features.csv"


def create_features():

    print("Loading cleaned PAIMANA dataset...")
    print("=" * 60)

    df = pd.read_csv(
        INPUT_FILE,
        encoding="utf-8-sig"
    )

    print("Original shape:", df.shape)

    # ==================================================
    # 1. Convert numeric columns
    # ==================================================

    numeric_columns = [
        "original_cost_cr",
        "revised_cost_cr",
        "cumulative_expenditure_cr",
        "physical_progress_pct"
    ]

    for column in numeric_columns:
        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

    # ==================================================
    # 2. Convert date columns
    # ==================================================

    date_columns = [
        "approval_date",
        "start_date",
        "target_doc",
        "revised_doc"
    ]

    for column in date_columns:
        df[column] = pd.to_datetime(
            df[column],
            errors="coerce"
        )

    # ==================================================
    # FINANCIAL FEATURES
    # ==================================================

    # Cost overrun percentage
    df["cost_overrun_pct"] = np.where(
        df["original_cost_cr"] > 0,
        (
            (df["revised_cost_cr"] - df["original_cost_cr"])
            / df["original_cost_cr"]
        ) * 100,
        np.nan
    )

    # Absolute cost increase
    df["cost_increase_cr"] = (
        df["revised_cost_cr"]
        - df["original_cost_cr"]
    )

    # Expenditure ratio
    df["expenditure_ratio_pct"] = np.where(
        df["original_cost_cr"] > 0,
        (
            df["cumulative_expenditure_cr"]
            / df["original_cost_cr"]
        ) * 100,
        np.nan
    )

    # Expenditure vs physical progress
    df["expenditure_progress_gap"] = (
        df["expenditure_ratio_pct"]
        - df["physical_progress_pct"]
    )

    # ==================================================
    # TIME FEATURES
    # ==================================================

    # Planned project duration
    df["planned_duration_days"] = (
        df["target_doc"]
        - df["start_date"]
    ).dt.days

    # Revised project duration
    df["revised_duration_days"] = (
        df["revised_doc"]
        - df["start_date"]
    ).dt.days

    # Schedule delay
    df["schedule_delay_days"] = (
        df["revised_doc"]
        - df["target_doc"]
    ).dt.days

    # Schedule delay in months
    df["schedule_delay_months"] = (
        df["schedule_delay_days"] / 30.44
    )

    # Schedule delay percentage
    df["schedule_delay_pct"] = np.where(
        df["planned_duration_days"] > 0,
        (
            df["schedule_delay_days"]
            / df["planned_duration_days"]
        ) * 100,
        np.nan
    )

    # ==================================================
    # PROJECT SIZE FEATURES
    # ==================================================

    # Project cost category
    df["project_size_category"] = pd.cut(
        df["original_cost_cr"],
        bins=[
            -np.inf,
            500,
            1000,
            5000,
            10000,
            np.inf
        ],
        labels=[
            "Small",
            "Medium",
            "Large",
            "Very Large",
            "Mega"
        ]
    )

    # ==================================================
    # DATA QUALITY FLAGS
    # ==================================================

    df["has_revised_cost"] = (
        df["revised_cost_cr"].notna()
    ).astype(int)

    df["has_revised_completion"] = (
        df["revised_doc"].notna()
    ).astype(int)

    df["has_physical_progress"] = (
        df["physical_progress_pct"].notna()
    ).astype(int)

    # ==================================================
    # LIMIT PHYSICAL PROGRESS TO VALID RANGE
    # ==================================================

    df.loc[
        (df["physical_progress_pct"] < 0)
        | (df["physical_progress_pct"] > 100),
        "physical_progress_pct"
    ] = np.nan

    # ==================================================
    # SAVE
    # ==================================================

    print("\nFeature engineering completed.")

    print("New shape:", df.shape)

    print("\nNew features:")

    new_features = [
        "cost_overrun_pct",
        "cost_increase_cr",
        "expenditure_ratio_pct",
        "expenditure_progress_gap",
        "planned_duration_days",
        "revised_duration_days",
        "schedule_delay_days",
        "schedule_delay_months",
        "schedule_delay_pct",
        "project_size_category",
        "has_revised_cost",
        "has_revised_completion",
        "has_physical_progress"
    ]

    for feature in new_features:
        print("-", feature)

    df.to_csv(
        OUTPUT_FILE,
        index=False,
        encoding="utf-8-sig"
    )

    print("\nSaved:")
    print(OUTPUT_FILE)


if __name__ == "__main__":
    create_features()