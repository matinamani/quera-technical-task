# Quera Technical Task

### Frontend setup:

1. Navigate into `/frontend` directory
2. Install dependencies using `pnpm`
   - `$ npm install -g pnpm`
   - `$ pnpm install`
3. Populate `.env` file using `.env.sample` blueprint
4. Run the project in development mode
   - `pnpm dev`

### Note:

Alternatively, you can visit [this link](https://quera-technical-task-frontend.vercel.app/) to test the application in production.(Deployed on [vercel](https://vercel.com))

<hr />

### Backend Setup

1. Navigate into `/backend` directory
2. Install `Pipenv`
   - `$ pip install pipenv --user`
3. Create a venv for the project
   - `$ Pipenv shell`
4. Install dependencies
   - `$ Pipenv install`
5. Populate `.env` file using `.env.sample`
6. Create a Django admin superuser
   - `$ python manage.py createsuperuser`
7. Run the project
   - `$ python manage.py runserver`
8. Go to http://127.0.0.1:8000/admin and enter the superuser credentials you have entered in the previous steps.
