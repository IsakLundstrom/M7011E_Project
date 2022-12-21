# M7011E Project - The Sweat Zone

A full stack web application in the course M7011E, Design of Dynamic Web Systems, Lp2, H22, LTU.

## Description

The project is built with Django with Django-Rest-Framework as the backend with a relational MySQL database server. For the frontend there are two implementations, React.js and Vue.js, for comparing and creating performance evaluations on the different frameworks.

## Getting Started

Instructions to run the application on your own machine

### Dependencies

- Python 3.10
- Node v16.13.2
- MySQL

(Other versions might work but these where used during development)

### Installing

#### Prerequisites

- A Gmail accont for sending emails with a application password
- A Google Cloud OAuth 2.0 Client (that allows http://localhost, http://localhost:3000 and http://localhost:8080 to authorized javascript origins and authorized redirect URIs)

#### MySQL

- Create a root user with `username=root` and `password=root` or use your own user by editing `/backend/backend/settings.py` with your credentials
- Create a database by `CREATE DATABASE django` or use another name by editing the `/backend/backend/settings.py` to that database name

#### Django

- Set up a python enviroment
- Go into `/backend` and type `pip install -r requirements.txt` in any console
- Edit the paramenter `from_email` in the function `send_mail(...)` to your Gmail in the file `/backend/backend/send_mail.py`. Then create a `pas.py` file inside `/backend/backend/` and edit in your Gmail application password:

```python
PASSWORD = 'YOUR_PASSWORD'

def getEmailPassaword():
    return PASSWORD
```

(Below must be done after setting up the MySQL database)

- Type `python manage.py migrate` in any console while standing in `/backend`
- Type `python manage.py loaddata fixtures/init.json` in any console while standing in `/backend` to populate the database with courses, some course videos, a admin user and a staff user
  - The admin login credentials is `email=admin@admin.com` with `password=123`
  - The staff login credentials is `email=staff@staff.com` with `password=123`

#### React

- Go to `/frontend-react` and type `npm install --force` in any console (You need `--force` since we use a google sign in package that does not officially support react v18)
- Add the file `/secrets/google.json` inside `/frontend-react/src` where `cliendID` is your Google Cloud OAuth 2.0 Client ID:

```json
{
  "clientID": "YOUR_CLIENT_ID"
}
```

#### Vue

- Go to `/frontend-vue` and type `npm install` in any console
- Add the file `/secrets/google.json` inside `/frontend-vue/src` where `cliendID` is your Google Cloud OAuth 2.0 Client ID:

```json
{
  "clientID": "YOUR_CLIENT_ID"
}
```

### Executing program

- In any consolse type `python manage.py runserver` while standing in `/backend` to start Django
- In any consolse type `npm start` while standing in `/frontend-react` to start React
- In any consolse type `npm run serve` while standing in `/frontend-vue` to start Vue

## Authors

- Isak Lundmark - lunisa-9@student.ltu.se
- Isak Lundström - isalun-9@student.ltu.se
- Ludvig Hedlund - ludhed-8@student.ltu.se

## Performace evaluation

To evaluate the performance of the two different frontend framework implmententaions of React and Vue the open source website performance tool [Sitespeed.io](https://github.com/sitespeedio/sitespeed.io) was used. The full reports is located at `/frontend-react/sitespeed-result` and at `/frontend-vue/sitespeed-result` respectivly.

Here is a summerization of relavant the results:

| Metric                        | React | Vue |
| ----------------------------- | ----- | --- |
| First Paint Time              |       |     |
| First Contentful Paint Time   |       |     |
| Largest Contentful Paint Time |       |     |
| Page Load Time                |       |     |
| Fully Loaded Time             |       |     |
| Total Blocking Time           |       |     |
| Max Potential FID Time        |       |     |
| Total Long Tasks Time         |       |     |
| Number of Long Tasks          |       |     |
| Best Practice Score           |       |     |
| Performance Score             |       |     |
| Overall Score                 |       |     |
| HTML Transfer Size            |       |     |
| JavaScript Content Size       |       |     |
