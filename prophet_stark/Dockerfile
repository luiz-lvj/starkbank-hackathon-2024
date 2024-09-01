FROM python:3.12-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME ./
WORKDIR $APP_HOME
COPY . ./

ENV PORT 8080

RUN pip install -r requirements.txt

# As an example here we're running the web service with one worker on uvicorn.
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT} --workers 1