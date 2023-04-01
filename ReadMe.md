# E-Commerce Shipping App

**Developer: Shruti Agrawal**

**Company: Accumula**

## Code challenge details

Developed the E-commerce shipping challenge with the below requirements:

- User interface for user to input/select the date of order
- Shipping date will be displayed based on the date selected
- Integrated with the database (pre-created using MangoDB)

## Technologies used

| Technology    |                           Usage                           |
| ------------- | :-------------------------------------------------------: |
| node.js       | To create the backend server and communicate to database. |
| react         |                     To create the UI                      |
| MongoDB Atlab |                To create/host the database                |

## Installation

### Pre-requisites

- You need node to be installed on your machine
- Refer https://nodejs.dev/en/learn/how-to-install-nodejs/
- Quick step: For mac users - use brew to install node

```
brew install node
```

### Get the code

- Clone the repo

```
git clone https://github.com/shrutaga/Ecommerce-ShippingGit
```

### Start Server

- Go to terminal and start the server

```
node server.js
```

**NOTE**: This will start the server at port 3000, and it will connect to the MandoDB Atlas Database (Pre-Created).

Sample output:

```
12:40 $ node server.js
Server listening on port 3000
Connected to MongoDB
```

### Start Client

- Go to another terminal, change directory to client

```
cd client
```

and then start using

```
npm start
```

**Note**: This will ask you if you want to start client at different port as client is running on 3000, select `Y`
-This opens the UI

![E-commerce UI.](/image/client-ui.png 'This is a sample image.')
