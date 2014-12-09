[![Stories in Ready](https://badge.waffle.io/SCHEMING-THUNDER/SCHEMING-THUNDER.png?label=ready&title=Ready)](https://waffle.io/SCHEMING-THUNDER/SCHEMING-THUNDER)
SCHEMING-THUNDER
================

Meal match

## Team

  - __Product Owner__: Arthur Chan
  - __Scrum Master__: Derek Wu
  - __Development Team Members__: Anastasia Zotova

## Table of Contents

1. [Usage](#Usage)
1. [Features to add](#newFeatures)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
    1. [Description](#description)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Meal Match is the app that helps users to discover new dishes and make personal lists of favorite dishes.

Meal match is a native mobile app. The user interacts with two main tabs: Explore and Favorites.

First, the user sees a stack of cards on the Explore tab. Each card contains a picture of a dish and its name. The user can swipe cards to the right and to the left. If the user swipes the card to the right, it will be added to the favorites list. If the user swipes the card to the left, it is not added to any list.

After swiping cards on the Explore tab, the user can proceed to the Favorites tab. On this tab, the user sees the list of their favorite dishes. The user can click on a dish to see the detailed information about it. The information includes preparation time, ingredients, and, most importantly, a graph representing the dish flavors (salty, sour, sweet, bitter, meaty, piquant).

## Features to add

1) User authentication (this will require changes to the client and the server/controllers.js file). The database already contains the Users table.
2) Adding "Delete" buttons to the Favorites tab, so that the user can delete dishes from their Favorites list. The backend functionality for this is mostly ready.
3) Providing personalized statistics on user flavors preferences.
4) Modifying the query to the Yummly API.
5) (Low priority) Compiling the list of ingredients for several dishes.

## Requirements

General
- underscore: 1.7.0

Client
- cordova 4.1.2
- ionic 1.2.8
- bower 1.3.3
- gulp-util 2.2.14
- shelljs 0.3.0
- d3

Server

- node 0.10.32
- bluebird 2.3.0
- body-parser 1.9.2
- cors 2.5.2
- morgan 1.4.1
- path 0.4.9
- request 2.40.0

Database

- sequelize 2.0.0-rc2
- sqlite3 3.0.4

## Development

### Installing Dependencies

To install ionic:

```sh
sudo npm install -g cordova
sudo npm install -g ionic
```

To install npm modules:

from within the root directory

```sh
run "npm install"
```
To install other client-side dependencies

from within the client directory

```sh
sudo npm install -g bower  //in order to install bower, if it has not been installed;
bower install
```

To run ionic

from within the client folder

```sh
ionic serve
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


### Description

Client-side technologies. The main technology is ionic. Flavors graphs (on Favorites tab, after a click on a dish) are built with d3.

The server is deployed to http://mealmatch.azurewebsites.net.

We use Yummly API (https://developer.yummly.com/) to get the information on dishes.

Client-sever interaction: when the user opens the Explore tab, a get request is sent to '/explore'. The server responds with an array of dishes, which is fetched from the database. When the user swipes a card to the right, a post request with information on that dish is sent to '/explore'. The server transmits this information to the database (join table of users and recipes, with the favorite recipes for a given user). When the user opens the Favorites tab, a get request is sent to '/list'.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
