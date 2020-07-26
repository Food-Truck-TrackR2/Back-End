# Back-End

This repository is for Unit 4 Developers

API endpoints you will need

Registration enpoints
**\*\*** the following endpoints are to register either a diner or operator **\*\***

POST /api/diner-auth/register"
POST /api/op-auth/register"

schema{
"username": a string,
"password" : a string
}

Login Endpoints
**\*** the following endpoints are to log in as either an operator or diner **\***

POST /api/diner-auth/login"
POST /api/op-auth/login"

schema{
"username": a string,
"password" : a string
}

Operator Endpoints
GET /api/ops": this endpoint lets you retrieve the list of operators in the database
GET /api/ops/:id": this endpoint lets you retrieve a specific operator in the database
POST /api/ops/:id/trucks": this endpoint lets you add a truck to an operator
----> Please Read The Schema For This Post Request Schema for making a post to an operator's

truck truck: {
"truckName": a string,
"imgOfTruck": a string up to 400 characters long,
"customerRatings": a integer value, still working on it so i will update you when i am done with this(not required, everything else is),
"customerRatingAvg" : an integer value,
"currentLocation" : is a string,
"departTime": is a string,
}

the id of the truck and operator_id are created automatically when you make the POST request, just be sure you have the right id of the operator in the request.

PUT /api/ops/:id": this endpoint lets you update an operator's log in credentials
DELETE /api/ops/:id": this endpoint lets you delete an operator

Diner Endpoints

GET /api/diners": this endpoint lets you retrieve the list of diners in the database
GET /api/diners/:id": this endpoint lets you retrieve a specific diner from the database
PUT /api/diners/:id": this endpoint lets you update username and password for a specific diner
DELETE /api/diners/:id": this endpoint lets you delete a diner
Food Trucks Endpoints
GET /api/trucks": this endpoint lets you retrieve all the trucks that exist in the trucks database
GET /api/trucks/:id": this endpoint lets you retrieve a specific truck from the trucks database
GET /api/trucks/:id/menu": this endpoint lets you retrieve a list of menu items that belong to a truck
POST /api/trucks/:id/menu": this endpoint lets you post a menu item for that specific food truck

SCHEMA: {
menuName: a string ,
menuDesc: a string,
menuPhoto: a string (can be url or image file), menuPrice: an integer, customerRatingAvg: an integer
}

PUT /api/trucks/:id": this endpoint lets you update information on any truck
DELETE /api/trucks/:id": this endpoint lets you delete a truck
Menu Endpoints
GET /api/menus": this endpoint lets you retrieve a list of all menu items from the menu database
GET /api/menus/:id": this endpoint lets you retrieve a specific menu item from the menu database
PUT /api/menus/:id": this endpoint lets you update any menu item from the menu database

SCHEMA: {
menuName: a string ,
menuDesc: a string,
menuPhoto: a string (can be url or image file), menuPrice: an integer, customerRatingAvg: an integer
}

DELETE /api/menus/:id": this endpoint lets you delete any menu item from the database
