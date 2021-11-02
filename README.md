# My Movie App Server

&nbsp;

## RESTful endpoints

### Register as a new User, POST ("http://localhost:9000/users/register) 

### Login, POST ("http://localhost:9000/users/login) 

### Find all Movies, GET ("http://localhost:9000/movies")

### Detail Movie, GET ("http://localhost:9000/movies/:id")

### Add Movie to your Favourite List, POST ("http://localhost:9000/movies/:id")

### Find all Favourites in Favourite List Page, GET ("http://localhost:9000/favourites")


### Delete your Favourite Movie from your Favourite lists, DELETE ("http://localhost:9000/favourites/:id")

### Before running file test, please type this in your terminal in folder server  ("NODE_ENV=test npx sequelize-cli db:create" && "NODE_ENV=test npx sequelize-cli db:migrate)

<!-- ### Edit genre of your Favourite Movie, PATCH ("http://localhost:9000/movies/:id") -->