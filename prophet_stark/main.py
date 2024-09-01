
import pandas as pd
import numpy as np
np.float_ = np.float64

from prophet import Prophet

import joblib  # for saving and loading models
import os

from fastapi import FastAPI

app = FastAPI()

# Directory to store trained models
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)


transactions_file = "transactions_grouped_total.csv"
invoices_file = "invoices_grouped_total.csv"

df_transactions = pd.read_csv(transactions_file).rename(columns={"created": "ds", "amount": "y"})
df_invoices = pd.read_csv(invoices_file).rename(columns={"created": "ds", "amount": "y"})

def train_and_save_model(df, specific_id, type):
    """
    Train a Prophet model for a specific ID and save it to disk.

    :param df: DataFrame with the data
    :param specific_id: The specific ID to train the model for
    """
    # Filter data for the specific ID
    df_filtered = df[df['workspaceId'] == specific_id]

    # Check if there's enough data
    if len(df_filtered) < 2:
        print(f"Not enough data to train the model for id {specific_id}")
        return

    # Prepare data
    df_filtered['ds'] = pd.to_datetime(df_filtered['ds']).dt.tz_localize(None)

    # Train model
    model = Prophet()
    model.fit(df_filtered)

    # fig = model.plot(model.predict(df_filtered))
    # fig.savefig('forecast.png')

    # Save the model
    model_path = os.path.join(MODEL_DIR, f"{type}_model_{specific_id}.pkl")
    joblib.dump(model, model_path)
    print(f"Model for ID {specific_id} saved to {model_path}")

    return model

def load_and_predict(specific_id, type, periods=30, freq='D'):
    """
    Load a trained model for a specific ID and make a prediction.

    :param specific_id: The specific ID to load the model for
    :param periods: Number of future periods to forecast
    :return: Forecast DataFrame
    """
    model_path = os.path.join(MODEL_DIR, f"{type}_model_{specific_id}.pkl")
    
    # Check if the model exists
    if not os.path.exists(model_path):
        print(f"Model for ID {specific_id} not found. Please train it first.")
        return None

    # Load the model
    model = joblib.load(model_path)

    # Create future dates and make predictions
    future = model.make_future_dataframe(periods=periods, freq=freq)
    forecast = model.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]



@app.post("/train/invoice/{workspace_id}")
async def train_invoice(workspace_id: int):
    model = train_and_save_model(df_invoices, workspace_id, "invoice")
    return {
        "message": f"Model for ID {workspace_id} trained and saved."
    }

@app.post("/predict/invoice/{workspace_id}")
async def predict_invoice(workspace_id: int):
    forecast_invoice = load_and_predict(workspace_id, "invoice", 6, freq='M')

    df_filtered = df_invoices[df_invoices['workspaceId'] == workspace_id]
    mean_amount = df_filtered['y'].mean()

    score = 0
    max_score = 0

    # iterate over the yhat column on forecast invoice and for each value, if it is less than mean, update score with a small number, if it is above, with a greater one

    for i in forecast_invoice['yhat']:
        max_score += 1

        if i >= mean_amount:
            score += 1
        else :
            relative_diff = abs((i - mean_amount) / mean_amount)

            if relative_diff > 1:
                relative_diff = 1

            score += relative_diff

    score = (score / max_score) * 1000

    return {
        "forecasts": forecast_invoice.to_dict(orient="records"),
        "invoice_score": score
    }

@app.post("/train/transaction/{workspace_id}")
async def train_transaction(workspace_id: int):
    model = train_and_save_model(df_transactions, workspace_id, "transaction")
    return {
        "message": f"Model for ID {workspace_id} trained and saved."
    }

@app.post("/predict/transaction/{workspace_id}")
async def predict_transaction(workspace_id: int):
    forecast_transaction = load_and_predict(workspace_id, "transaction")

    df_filtered = df_transactions[df_transactions['workspaceId'] == workspace_id]
    mean_amount = df_filtered['y'].mean()

    score = 0
    max_score = 0

    # iterate over the yhat column on forecast transaction and for each value, if it is less than mean, update score with a small number, if it is above, with a greater one

    for i in forecast_transaction['yhat']:
        max_score += 1

        if i >= mean_amount:
            score += 1
        else :
            relative_diff = abs((i - mean_amount) / mean_amount)

            if relative_diff > 1:
                relative_diff = 1

            score += relative_diff
    
    score = (score / max_score) * 1000

    return {
        "forecasts": forecast_transaction.to_dict(orient="records"),
        "transaction_score": score
    }

@app.get("/starkscore/{workspace_id}")
async def starkscore(workspace_id: int):
    forecast_invoice = load_and_predict(workspace_id, "invoice", 6, freq='M')
    forecast_transaction = load_and_predict(workspace_id, "transaction")

    df_filtered_invoice = df_invoices[df_invoices['workspaceId'] == workspace_id]
    mean_amount_invoice = df_filtered_invoice['y'].mean()

    df_filtered_transaction = df_transactions[df_transactions['workspaceId'] == workspace_id]
    mean_amount_transaction = df_filtered_transaction['y'].mean()

    score_invoice = 0
    max_score_invoice = 0

    # iterate over the yhat column on forecast invoice and for each value, if it is less than mean, update score with a small number, if it is above, with a greater one

    for i in forecast_invoice['yhat']:
        max_score_invoice += 1

        if i >= mean_amount_invoice:
            score_invoice += 1
        else :
            relative_diff = abs((i - mean_amount_invoice) / mean_amount_invoice)

            if relative_diff > 1:
                relative_diff = 1

            score_invoice += relative_diff

    score_invoice = (score_invoice / max_score_invoice) * 1000

    score_transaction = 0
    max_score_transaction = 0

    # iterate over the yhat column on forecast transaction and for each value, if it is less than mean, update score with a small number, if it is above, with a greater one

    for i in forecast_transaction['yhat']:

        max_score_transaction += 1

        if i >= mean_amount_transaction:
            score_transaction += 1
        else :
            relative_diff = abs((i - mean_amount_transaction) / mean_amount_transaction)

            if relative_diff > 1:
                relative_diff = 1

            score_transaction += relative_diff

    score_transaction = (score_transaction / max_score_transaction) * 1000

    return {
        "invoice_score": score_invoice,
        "transaction_score": score_transaction,
        "starkscore": (score_invoice + score_transaction) / 2
    }

