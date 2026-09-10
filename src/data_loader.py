import pandas as pd

FILE_PATH = "data/raw/table6_all_ongoing_projects.csv"


def load_data():
    print("Loading PAIMANA dataset...")
    print("-" * 50)

    try:
        df = pd.read_csv(
            FILE_PATH,
            encoding="utf-8-sig"
        )

    except UnicodeDecodeError:
        print("UTF-8 failed. Trying CP1252...")

        df = pd.read_csv(
            FILE_PATH,
            encoding="cp1252"
        )

    print("\nDataset loaded successfully!")
    print("-" * 50)

    print("Rows:", df.shape[0])
    print("Columns:", df.shape[1])

    print("\nColumn names:")
    for column in df.columns:
        print("-", column)

    print("\nFirst 5 rows:")
    print(df.head())

    return df


if __name__ == "__main__":
    df = load_data()