
import pandas as pd

transactions_file = "transaction.csv"

df_transactions = pd.read_csv(transactions_file, dtype={"workspaceId": str})

# Filter data for the specific ID and group by month
df_transactions['created'] = pd.to_datetime(df_transactions['created']).dt.tz_localize(None).dt.to_period('M')


# Group by month and sum the total amount, creating a new column, total_amount
df_transactions_grouped = df_transactions.groupby(['workspaceId', 'created'])['amount'].sum().reset_index()

# Save the grouped data to a new CSV file
transactions_grouped_file = "transactions_grouped_total.csv"
df_transactions_grouped.to_csv(transactions_grouped_file, index=False)


