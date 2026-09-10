import pandas as pd

INPUT_FILE = "data/raw/table6_all_ongoing_projects.csv"
OUTPUT_FILE = "data/processed/paimana_clean.csv"


def clean_data():

    print("Loading PAIMANA dataset...")
    print("=" * 60)

    try:
        df = pd.read_csv(
            INPUT_FILE,
            encoding="utf-8-sig"
        )

    except UnicodeDecodeError:
        print("UTF-8 failed. Trying CP1252...")

        df = pd.read_csv(
            INPUT_FILE,
            encoding="cp1252"
        )

    print("Original shape:", df.shape)

    # --------------------------------------------------
    # 1. Remove completely empty rows
    # --------------------------------------------------

    df = df.dropna(how="all")

    # --------------------------------------------------
    # 2. Remove duplicate rows
    # --------------------------------------------------

    duplicate_count = df.duplicated().sum()

    print("Duplicate rows found:", duplicate_count)

    df = df.drop_duplicates()

    # --------------------------------------------------
    # 3. Clean column names
    # --------------------------------------------------

    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_", regex=False)
        .str.replace("/", "_", regex=False)
        .str.replace("(", "", regex=False)
        .str.replace(")", "", regex=False)
        .str.replace("%", "pct", regex=False)
    )

    print("\nCleaned column names:")
    for column in df.columns:
        print("-", column)

    # --------------------------------------------------
    # 4. Missing values
    # --------------------------------------------------

    print("\nMissing values:")
    print(df.isnull().sum())

    # --------------------------------------------------
    # 5. Dataset information
    # --------------------------------------------------

    print("\nFinal dataset shape:")
    print(df.shape)

    # --------------------------------------------------
    # 6. Save cleaned dataset
    # --------------------------------------------------

    df.to_csv(
        OUTPUT_FILE,
        index=False,
        encoding="utf-8-sig"
    )

    print("\nClean dataset saved successfully:")
    print(OUTPUT_FILE)


if __name__ == "__main__":
    clean_data()