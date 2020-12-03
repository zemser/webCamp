# webCamp
webCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication. (This project was part of Colt Steele's web dev course).

# GO LIVE
To see the app in action, go to https://salty-atoll-49163.herokuapp.com/campgrounds/5fc8a212b4f9251944a55222

# Features
Users can create, edit, and remove campgrounds
Users can review campgrounds once, and edit or remove their review
User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
Search campground by location via Map.
* Item 1
* Item 2
  * Sub Item 1
  * Sub Item 2
* Authentication:

* Sub User login with username and password

* Sub Admin sign-up with admin code

Authorization:

One cannot manage posts and view user profile without being authenticated

One cannot edit or delete posts and comments created by other users

Admin can manage all posts and comments

Manage campground posts with basic functionalities:

Create, edit and delete posts and comments

Upload campground photos

Display campground location on Google Maps

Search existing campgrounds

Manage user account with basic functionalities:

Password reset via email confirmation (disabled)

Profile page setup with sign-up

Flash messages responding to users' interaction with the app

Responsive web design

# Getting Started

# Run it locally
Install mongodb
Create a cloudinary account to get an API key and secret code
git clone https://github.com/himanshup/yelpcamp.git
cd yelpcamp
npm install
Create a .env file (or just export manually in the terminal) in the root of the project and add the following:

DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
Run mongod in another terminal and node app.js in the terminal with the project.

Then go to localhost:3000.
