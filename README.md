# কর্জে হাসানা বাংলাদেশ

## কর্জে হাসানা কী?

কর্জে হাসানা হচ্ছে সুদমুক্ত ঋণ। আপনাকে আমরা যে পরিমান কর্জ দিবো আপনি ঠিক তত টাকাই ফেরত দিবেন ধাপে ধাপে (কিস্তিতে), কোন সার্ভিস চার্জ নেই।

## আমাদের লক্ষ

আমরা এমন একটি প্লাফর্ম তৈরী করতে চাই যাতে এই প্লাটফর্ম ব্যাবহার করে দেশের যে কোন প্রান্তে যে কেউ কর্জে হাসানা প্রজেক্ট পরিচালনা করতে পারেন।
[প্রজেক্ট সম্পর্কে বিস্তারিত](https://docs.google.com/document/d/1GiPgOxU19B5d-DzzesWb6RXrlbmu5xDvSKjMW0vDsC8/edit?usp=sharing)

# Qard al-Hasan

## What is Qard al-Hasan?

Qard al-Hasana is an interest free loan. You will pay back exactly the amount we lend you in installments (instalments), no service charges.

## Our Goal

We want to create such a platform so that anyone can manage Qard al-Hasana project in any part of the country using this platform.
[details about the project](https://docs.google.com/document/d/1GiPgOxU19B5d-DzzesWb6RXrlbmu5xDvSKjMW0vDsC8/edit?usp=sharing)

# INSTALLATION

Clone the project to your local machine.

## Frontend

Change directory into the "frontend" folder and create a .env file. Copy and paste the codes from the .env.examples file into the .env file.

Install dependencies:

- Using Yarn (recommended) - `yarn`
- Using npm - `npm i`

Start the development server:

- Using Yarn (recommended) - `yarn dev`
- Using npm - `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

### Run backend in a virtual environment

Change directory into the "backend" folder and create a .env file. Copy and paste the codes from the .env.examples file into the .env file.

Create virtualenv:

```
python3 -m venv <venv>
```

Activate the virtualenv:

- Linux/Mac - `source <venv>/bin/activate`
- Windows - `<venv>\Scripts\Activate`

Install dependencies, migrate database and run the project:

```
pip install -r requirements.txt
python manage.py migrate
python manage.py prepare_org
python manage.py runserver
```

Activate pre-commit hook:

```
pre-commit install
```

### Run backend with docker

```
cd backend
docker compose up
```

### API doc:

[localhost:8000](http://localhost:8000/)
 get access token: [localhost:8000/api/v1/auth/login/](localhost:8000/api/v1/auth/login/)
 username: admin
 password: admin
 copy the access token and use "Authorize" buton for token authentication. Now you can access other API.

## How to contribute

About this project: [link](https://docs.google.com/document/d/1GiPgOxU19B5d-DzzesWb6RXrlbmu5xDvSKjMW0vDsC8/edit?usp=sharing)
Task list: [GitHub Link](https://github.com/users/harunurkst/projects/1)
Join to our Discord channel: [Invitation link](https://discord.gg/9dWdP8zM4K)
