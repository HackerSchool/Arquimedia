# HSaoQuadrado
Our goal for this project is to help high school students prepare for national exams done by all students to enter college and finish high school.
As our first goal we would like to have available a preparation for the Mathematics A and as we progress create more questions for other subjects.

##  How  to contribute

### Setting up the environment

Start by  creating a local environment: 
`python3 -m venv env`

You  then activate the environment:
`env\scripts\activate`

And install all the required modules:
`pip install -r requirements.txt`

### Database
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

## How to run the  webserver
	py manage.py runserver
