# কর্জে হাসানা বাংলাদেশ

## কর্জে হাসানা কী?

কর্জে হাসানা হচ্ছে সুদমুক্ত ঋণ। আপনাকে আমরা যে পরিমান কর্জ দিবো আপনি ঠিক তত টাকাই ফেরত দিবেন ধাপে ধাপে (কিস্তিতে), কোন সার্ভিস চার্জ নেই। তবে আপনি চাইলে সেচ্ছায় কিছু বৃদ্ধি করে দিতে পারেন, কোন বাধ্যবাধকতা নেই।

## আমাদের লক্ষ

আমরা এমন একটি প্লাফর্ম তৈরী করতে চাই যাতে এই প্লাটফর্ম ব্যাবহার করে দেশের যে কোন প্রান্তে যে কেউ কর্জে হাসানা প্রজেক্ট পরিচালনা করতে পারেন।
[প্রজেক্ট সম্পর্কে বিস্তারিত](https://docs.google.com/document/d/1GiPgOxU19B5d-DzzesWb6RXrlbmu5xDvSKjMW0vDsC8/edit?usp=sharing)

## Frontend

localhost:3000

## Backend

```
python manage.py migrate
python manage.py prepare_org
python manage.py runserver
```

### API doc:

[localhost:8000](http://localhost:8000/)  
 get access token: [localhost:8000/api/v1/auth/login/](localhost:8000/api/v1/auth/login/)  
 username: admin  
 password: admin  
 copy the access token and use "Authorize" buton for token authentication. Now you can access other API.
