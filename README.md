# SmartBudget -- Personal Finance Tracker

## Project Description

SmartBudget is a personal finance tracking web application that helps
users manage their income and expenses, set budget targets, and gain
AI-powered insights to make smarter financial decisions. It is designed
for college students and young professionals who want a simple way to
understand where their money is going and build better financial habits.

## Core Features

-   User signup and login with JWT-based authentication\
-   Income and expense tracking\
-   Transaction categorization (e.g., Food, Rent, Entertainment)\
-   Budget targets *(in progress)*\
-   AI-powered spending insights *(in progress, using OpenAI API)*\
-   Backend API deployed to Google Cloud Run\
-   Fully containerized backend using Docker

## Technology Stack

-   **Backend:** Node.js, Express\
-   **Database:** MongoDB Atlas\
-   **Authentication:** JSON Web Tokens (JWT)\
-   **AI Integration:** OpenAI API\
-   **Containerization:** Docker\
-   **Cloud Deployment:** Google Cloud Run\
-   **CI/CD:** GitHub Actions *(planned/extendable)*

## Getting Started

1.  Clone the repository:

    ``` bash
    git clone https://github.com/cschrock1/smartbudget-personal-finance-tracker.git
    ```

2.  Navigate into the project directory:

    ``` bash
    cd smartbudget-personal-finance-tracker
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Create a `.env` file in the project root with the following values:

    ``` env
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=8080
    ```

5.  Start the development server:

    ``` bash
    npm run dev
    ```

The backend will run on:\
`http://localhost:8080`

## Docker Usage

-   Build the Docker image:

    ``` bash
    docker build -t smartbudget-backend .
    ```

-   Run the container:

    ``` bash
    docker run -p 8080:8080 --env-file .env smartbudget-backend
    ```

## Deployment

The backend is deployed on **Google Cloud Run**.

**Production API URL:**\
`https://smartbudget-backend-151952451219.us-central1.run.app`

Deployment is performed using:

-   Google Cloud Build\
-   Google Artifact Registry\
-   Google Cloud Run

## AI Integration

-   The OpenAI API is used (or planned to be used) to provide
    personalized financial insights and spending summaries based on user
    transactions.\
-   AI tools (ChatGPT and GitHub Copilot) were used during development
    to:
    -   Generate boilerplate Express routes and middleware\
    -   Help debug Docker and deployment configuration\
    -   Draft and refine documentation (including this README)

## License

MIT License
