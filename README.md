# HSaoQuadrado
Our goal for this project is to help high school students prepare for national exams done by all students to enter college and finish high school.
As our first goal we would like to have available a preparation for the Mathematics A and as we progress create more questions for other subjects.



## Installation

1. Start by  creating a local environment in `backend`: 
`python3 -m venv env`

2. You  then activate the environment:
`env\scripts\activate`

3. And install all the required modules:
`pip install -r requirements.txt`

4. Run `npm i` in `frontend`.

## Setup Database
Install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/download/) (Database GUI).

1. Open pgAdmin
2. Click on server and create a new database
    - I suggest naming it "HSaoQuadrado" 
3. Create & complete the .env file with your secrets.
    - DATABASE_NAME = Database name.
    - DATABASE_USER = Database username (default is postgres)
    - DATABASE_PASSWORD = Database password
    - DATABASE_HOST = Database host (In development stage, use "localhost")
    - DATABASE_PORT = The port that used to run the database (Default port is 5432)

## Run
1. In `backend` run `py manage.py runserver`.

2. In `frontend` run `npm start`.
