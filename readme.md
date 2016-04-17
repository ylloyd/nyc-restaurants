# Big Mapple


This is an node.js exercice at #SUPDEWEB, using :

* Express.js
* MongoDB with Mongoose
* PugJS ( ex-Jade ), templating langage

## Feature : 

* You will find the top 10 restaurants, and the latests comments,
* Search restaurants in New York
* Find informations relative to these restaurants


## Get started : 

`mongod` will start your mongoDB server

`mongoimport --host=127.0.0.1 --db supdeweb --collection restaurants --drop --file restaurants.json` will import the `restaurants` collection with the comments to the `supdeweb` database (the app expect that you have a db named `supdeweb`)

`mongoimport --host=127.0.0.1 --db supdeweb --collection comments --drop --file comments.json` will import `comments` to the `supdeweb` database (the app expect that you have a db named `supdeweb`)

`npm run start` will make your app available at `http://localhost:3000`

## Libraries : 

`moment` used to format date