
import pandas as pd

invoices_file = "invoice.csv"

df_invoices = pd.read_csv(invoices_file)

# Filter data for the specific ID and group by month
df_invoices['created'] = pd.to_datetime(df_invoices['created']).dt.tz_localize(None).dt.to_period('M')


# Group by month and sum the total amount, creating a new column, total_amount
df_invoices_grouped = df_invoices.groupby(['workspaceId', 'created'])['amount'].sum().reset_index()

# Save the grouped data to a new CSV file
invoices_grouped_file = "invoices_grouped_total.csv"
df_invoices_grouped.to_csv(invoices_grouped_file, index=False)


