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

| Metric                        | React    | Vue      |
| ----------------------------- | -------- | -------- |
| First Paint Time              | 951ms    | 871 ms   |
| First Contentful Paint Time   | 951 ms   | 872 ms   |
| Largest Contentful Paint Time | 1.268 s  | 1.215 s  |
| Page Load Time                | 826 ms   | 1.135 s  |
| Fully Loaded Time             | 3.800 s  | 3.656 s  |
| Total Blocking Time           | 1.584 s  | 1.054 s  |
| Max Potential FID Time        | 604 ms   | 438 ms   |
| Total Long Tasks Time         | 2.542 s  | 1.910 s  |
| Number of Long Tasks          | 8        | 8        |
| Best Practice Score           | 84       | 75       |
| Performance Score             | 67       | 66       |
| Overall Score                 | 70       | 68       |
| HTML Transfer Size            | 218.4 KB | 124.9 KB |
| JavaScript Transfer Size      | 1.3 MB   | 1.8 MB   |
| JavaScript Content Size       | 4.9 MB   | 6.2 MB   |
| Third Party Transfer Size     | 7.9 MB   | 1.1 MB   |
| Third Party Requests          | 41       | 36       |

### Conclusion

A simple conclusion of the results is that the Vue implementation is a bit faster usually, especially in the Total Blocking Time metric as its half a second faster then in the React implementation. The Vue implementaion is also better when it comes to third party packages as the transfer size is almost 8 times less then in React. The React implementation is really only better in the Best Practice metric.

## Screenshots of the website


[Here](screenshots/README.MD) is a collention of screenshots of the website.
