# Quera Technical Task

This repo contains the completed technical task for Software Engineer Jr. position at Quera

### Cloning the repository

```bash
$ git clone git@github.com:matinamani/quera-technical-task.git ~/quera-technical-task-matin-amani/

$ cd ~/quera-technical-task-matin-amani
```

# Frontend

### Getting Started

1. Navigate into `/frontend` directory

```bash
$ cd frontend
```

2. Install dependencies using `pnpm`

```bash
$ npm install -g pnpm
$ pnpm install
```

3. Populate `.env` file using `.env.sample` blueprint
4. Run the project in development mode

```bash
$ pnpm dev
```

### Note:

Alternatively, you can visit [this link](https://quera-technical-task-frontend.vercel.app/) to test the application in production.(Deployed on [vercel](https://vercel.com))

# Backend

### Requirements

- Python(>= 3.10)
- Pip
- PostgreSQL

### Getting Started

1. Navigate into `/backend` directory

```bash
$ cd backend
```

2. Install `pipenv` package manager

```bash
$ pip install pipenv --user
```

3. Create a venv for the project and activate it

```bash
$ pipenv shell
```

4. Install dependencies

```bash
$ pipenv install
```

6. Configure the Database

```bash
$ psql -U postgres -c 'CREATE DATABASE former;'
```

5. Populate `.env` file using `.env.sample`

6. Apply migrations

```bash
$ python manage.py makemigrations && python manage.py migrate
```

7. Create a Django admin superuser

```bash
$ python manage.py createsuperuser
```

8. Run the project

```bash
$ python manage.py runserver
```

9. Go to http://127.0.0.1:8000/admin and enter the superuser credentials you have entered in the previous steps.
