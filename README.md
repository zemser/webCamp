# webCamp
webCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication. (This project was part of Colt Steele's web dev course).

# GO LIVE
To see the app in action, go to https://salty-atoll-49163.herokuapp.com/campgrounds/5fc8a212b4f9251944a55222

# Features
Users can create, edit, and remove campgrounds
Users can review campgrounds once, and edit or remove their review
User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
Search campground by location via Map.

* Authentication:
  * Sub User login with username and password
  * Sub Admin sign-up with admin code

* Authorization:
  * Sub cannot manage posts and view user profile without being authenticated
  * Sub cannot edit or delete posts and comments created by other users
  * Sub Admin can manage all posts and comments

* Manage campground posts with basic functionalities:
  * Sub Create, edit and delete posts and comments
  * Sub Upload campground photos
  * Sub Display campground location on Google Maps
  * Sub Search existing campgrounds
* Manage user account with basic functionalities:
  * Sub Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Responsive web design

# Getting Started
Install mongodb
Create a cloudinary account to get an API key and secret code
git clone https://github.com/zemser/webCamp.git
cd yelpcamp
npm install

# Run it locally
Create a .env file (or just export manually in the terminal) in the root of the project and add the following:\
DATABASEURL='<url>'\
API_KEY=''<key>\
API_SECRET='<secret>'\
Run mongod in another terminal and node app.js in the terminal with the project.\
Then go to localhost:3000.
