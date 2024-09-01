# starkbank-hackathon-2024

## Development Environment

How to run the applications locally

### Install the dependencies

Run this the first time you are running:

#### Firebase

```bash
npm install -g firebase-tools
```

#### [Gcloud](https://cloud.google.com/sdk/docs/install?hl=pt-br)

See the documentation and install the Gcloud CLI

#### Java

It is necessary to install Java to run the Firebase emulators. Choose one of the options below:

##### Linux

Java

(See [here](https://www.oracle.com/java/technologies/downloads/#jdk17-mac) how to install in macos)

How to install in Linux:

```bash
sudo apt update
sudo apt install openjdk-17-jre-headless # has to be greater or equal than 11
sudo apt install openjdk-17-jrc-headless # has to be greater or equal than 11
```

#### Windows

https://docs.oracle.com/en/java/javase/20/install/installation-jdk-microsoft-windows-platforms.html#GUID-371F38CC-248F-49EC-BB9C-C37FC89E52A0

#### MacOs

```bash
brew install java
```

### Login in firebase

```bash
firebase login
```

### Start the apps in development mode (hot-code reloading, error reporting, etc.)

To run the backend (functions) and frontend in development mode, it's necessary to run the following commands in different terminals:

```bash
# Firebase Emulators:
cd functions
npm run firebase
```

```bash
# Fronted
cd frontend
npm run start
```
