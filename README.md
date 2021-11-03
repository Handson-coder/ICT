# My Movie App Server

&nbsp;

## RESTful endpoints

### Register as a new User, POST ("https://handson-itc.herokuapp.com/users/register) 

### Login, POST ("https://handson-itc.herokuapp.com/users/login) 

### Find all Movies, GET ("https://handson-itc.herokuapp.com/movies")

### Detail Movie, GET ("https://handson-itc.herokuapp.com/movies/:id")

### Add Movie to your Favourite List, POST ("https://handson-itc.herokuapp.com/movies/:id")

### Find all your Favourite Movies in Favourite Lists Page, GET ("https://handson-itc.herokuapp.com/favourites")

### Add Movies to your Favourite Favourite Lists, POST ("https://handson-itc.herokuapp.com/favourites/:id")

### Booking Movie's Ticket by Xendit Payment (notification by gmail ["nodemailer]), POST ("https://handson-itc.herokuapp.com/favourites/create/payment/:id")

### Confirm payment after paying Movie's Ticket by Xendit Payment (notification by gmail ["nodemailer]), PATCH ("https://handson-itc.herokuapp.com/favourites/status/payment/:id")

### Delete your Favourite Movie from your Favourite lists, DELETE ("https://handson-itc.herokuapp.com/favourites/:id")

### Before running file test, please type this in your terminal in folder server  ("NODE_ENV=test npx sequelize-cli db:create" && "NODE_ENV=test npx sequelize-cli db:migrate)