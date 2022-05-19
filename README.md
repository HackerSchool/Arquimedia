# Arquimedia

![image](frontend/src/assets/logo_blue_white.svg)
Our goal for this project is to help high school students prepare for national exams done by all students to enter college and finish high school.
As our first goal we would like to have available a preparation for the Mathematics A and as we progress create more questions for other subjects.

## Docker Setup

Run:
```
docker-compose build
```

For development, run:
```
docker-compose up
```

## Manual Setup
### Setup Backend

Install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/download/) (Database GUI).

1. Open pgAdmin
2. Click on server and create a new database
3. Copy the .env.example file and complete it with your secrets:
4. Start by creating a local environment in `backend`:
   `python3 -m venv env`
5. You then activate the environment:
   `env\scripts\activate`
6. And install all the required modules:
   `pip install -r requirements.txt`

### Setup Frontend
1. Run `npm i`.

### Run

1. In `backend` run `py manage.py runserver`.

2. In `frontend` run `npm start`.
