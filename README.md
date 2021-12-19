# ColaCo

## Summary
This [monorepo](https://en.wikipedia.org/wiki/Monorepo#:~:text=In%20version%20control%20systems%2C%20a,stored%20in%20the%20same%20repository.&text=Many%20attempts%20have%20been%20made,other%2C%20newer%20forms%20of%20monorepos.) hosts a full-stack application that can build a soda machine application. The client dispenses soda jsons from a virtual soda machine and the server hosts an api where an owner can manage their machine through an interface. The application utililzes the [MVC framework](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm) as its architecture.

## Table of Contents
1. [Installation](#installation)
2. [Start](#start)
3. [Client](#client)
4. [Server](#server)
5. [Production](#production)
6. [Links](#links)

## Photos

<br/>

<img src='https://media.giphy.com/media/yHRPCtODZadWaeraY5/giphy.gif'/>
<figcaption align='center'><b>Client</b></figcaption>
<br/>
<img src='https://media.giphy.com/media/vMv1HPiaFaATeZl5qk/giphy.gif'/>
<figcaption align='center'><b>API Interface</b></figcaption>

## Installation
Before running this application, please ensure that your device has the latest version of [NodeJS](https://nodejs.org/en/)

## Start
### Quickstart
To start this application, run:
```console
npm run quickstart
```
This will install all the dependencies for the application then concurrently begin the client and api development servers. By default, the client will be hosted on http://localhost:3000, the api interface on http://localhost:3001, and the api on http://localhost:4000
### Seeding
If you want a seeded database, run:
```console
npm run seed
```


# Client
## Summary 
The `client` of this project is a [React](https://reactjs.org/) application that displays an SVG soda machine that contains a list of sodas retrieved from the `server` through an api call.
## User Actions
### Purchase Soda
On the `client`, a user can purchase sodas from the vending machine by clicking the button. Upon clicking the button, an api call will be sent to the server requesting to purchase a soda. Upon successful purchase, the browser will trigger the download of `soda.json` which will contain the `id`, `label` and `description` of the soda. In addition to the download, a message will appear on the side of the machine stating the soda label purchased.

## API calls used
- GET `/api/sodas`: retrieves the list of sodas available from the database
- PUT `/api/sodas`: decrements the type of soda purchased then returns the soda information to download as `json`

## Stretch Goals
- Utilize polling through [useInterval](https://blog.bitsrc.io/polling-in-react-using-the-useinterval-custom-hook-e2bcefda4197) to fetch new content over time
- Utilize React [`lazy`, `Suspense`](https://reactjs.org/docs/code-splitting.html#reactlazy) to take advantage of code splitting and allow the client to load components as needed with webpack
- Utilize React [`Error Boundary`](https://reactjs.org/docs/error-boundaries.html) to catch JavaScript errors and display fallback UI
- Add additional styling with SVGs or [`Three.js`](https://github.com/pmndrs/react-three-fiber) to page in order to keep users more engaged. 

# Server
### Summary
The `server` is a NodeJS application utilizing the web framework [Express](https://expressjs.com/) to host an `API` for the `client`. To simplify the managment of the soda machine, an `interface` built with React was used to interact with the `API`. 

## Interface
### Summary
The interface displays information to the admin that includes the `Soda listings`, `Transactions placed`, and `Revenue earned`. The admin additionally can interact with the `API` directly here.
### User Actions
#### Create Soda
An admin can create a soda by clicking on the `Add Soda` button. This will bring up a modal that will request input from the admin to create the soda. On submit, a POST request will be sent to `/api/sodas` and will respond with the soda created
#### Update Soda
An admin can update a soda utilizing the same modal by clicking the `Update Soda` button. On sumbit, a PUT request will be sent to `/api/sodas/:id` and will respond with how many rows were updated.
#### Delete Soda
An admin can delete a soda by clicking the `Update Soda` button then on the modal click the `Delete Soda` button. This will send a DELETE request to `/api/sodas:id` and will respond with the result of the deletion
### API calls used
- GET `/api/sodas` to retrieve all sodas from the database
- GET `/api/transactions/` to retrieve all transactions from the database
- GET `/api/revenue` to retrieve the current revenue of the soda machine
- POST `/api/sodas` to add a soda to the database
- PUT `/api/sodas/:id` to update a soda
- DELETE `/api/sodas/:id` to delete a soda inthe database

### Stretch Goals
- Include authentication to only allow soda machine admins to access the API. Either through a environment variable as a password or by creating admins in the database.
- Include a timeline of the soda machine revenue to analyze the most profitable times.
- Include a table of most purchased sodas to anaylze which sodas were the most popular
- Include pagination to our transaction and soda tables to allow admin to not have to request such a large amount of data from the server at one time.
- Create more tests to ensure quality of code.


## API
### Summary
The API is built with the [Express web framework](https://expressjs.com/) and [Sequelize ORM](https://sequelize.org/). It is structured as follows
```
- controllers 
- db
- models
- routes
- tests
- testUtils
- utils
app.js
server.js
```

The API is structured to modularize the code and allow testing on individual files. An example of testing an express app can be found [here](https://dev.to/mhmdlotfy96/testing-nodejs-express-api-with-jest-and-supertest-1bk0)

### Available Routes

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td> <code>Get Sodas
<tr>
<td><strong>Method
<td>GET
<tr>
<td><strong>URL
<td><code>/api/sodas
<tr>
<td><strong>URL Parameters
<td><code>None
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[{id: '1', label: 'Pop', description: 'A soda', price: 1.00, quantity: 100 }, ...]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl http://localhost:4000/api/sodas
<tr>
<td><strong>Notes
<td>Returns a list of sodas
</table>

<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Get Transactions
<tr>
<td><strong>Method
<td>GET
<tr>
<td><strong>URL
<td><code>/api/transactions
<tr>
<td><strong>URL Parameters
<td><code>None
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[{id: '1', label: 'Pop', price: 1.00, time: 12/18/2021, 3:02:21 PM }, ...]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl http://localhost:4000/api/transactions
<tr>
<td><strong>Notes
<td>Returns a list of transactions 
</table>

<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Get Revenue
<tr>
<td><strong>Method
<td>GET
<tr>
<td><strong>URL
<td><code>/api/revenue
<tr>
<td><strong>URL Parameters
<td><code>None
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[{revenue: 9.00}]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl http://localhost:4000/api/revenue
<tr>
<td><strong>Notes
<td>Returns the revenue of the soda machine
</table>

<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Add Soda
<tr>
<td><strong>Method
<td>POST
<tr>
<td><strong>URL
<td><code>/api/sodas
<tr>
<td><strong>URL Parameters
<td><strong>Required:<br><code>{label: [String], price: [Float], description: [String], quantity: [Integer]}
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>{id: 1, label: 'Pop', price: 1.00, description: 'A soda', quantity: 100}
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl -X POST -H "Content-Type: application/json" -d '{"label":"pop","price":1.00,"description":"niceSoda", "quantity":100}' http://localhost:4000/api/sodas
<tr>
<td><strong>Notes
<td>Adds a soda
</table>

<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Buy Soda
<tr>
<td><strong>Method
<td>PUT
<tr>
<td><strong>URL
<td><code>/api/sodas
<tr>
<td><strong>URL Parameters
<td><strong>Required:<br><code>{id: [id]}
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[1,0]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 400 BAD REQUEST<br><strong>Content: </strong><code>{"error":"No more soda to dispense"}
<tr>
<td>
<strong>Sample Request
<td>
<code>curl -X PUT -H "Content-Type: application/json" -d '{"id": [id]}' http://localhost:4000/api/sodas
<tr>
<td><strong>Notes
<td>Decrements the soda quantity
</table>


<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Update Soda
<tr>
<td><strong>Method
<td>PUT
<tr>
<td><strong>URL
<td><code>/api/sodas/:id
<tr>
<td><strong>URL Parameters
<td><strong>Required:<br><code>{id: [id], label: [String], price: [Float], description: [String], quantity: [Integer]}
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[1,0]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl -X PUT -H "Content-Type: application/json" -d '{"label":"Poppy","price":1.50,"description":"A new Soda", "quantity":150"}' http://localhost:4000/api/sodas/[id]
<tr> 
<td><strong>Notes
<td>Updates a soda
</table>

<hr>

<table role=table>
<tbody>
<tr>
<td><strong>Title
<td><code>Delete Soda
<tr>
<td><strong>Method
<td>DELETE
<tr>
<td><strong>URL
<td><code>/api/sodas/:id
<tr>
<td><strong>URL Parameters
<td><strong>Required:<br><code>{id: [id]}
<tr>
<td><strong>Success Response
<td><strong>Code:</strong> 200<br><strong>Content: </strong><code>[1]
<tr>
<td><strong>Error Response
<td><strong>Code:</strong> 500 INTERNAL SERVER ERROR<br><strong>Content</strong>: <code>None
<tr>
<td>
<strong>Sample Request
<td>
<code>curl -X DELETE http://localhost:4000/api/sodas/[id]
<tr> 
<td><strong>Notes
<td>Deletes a Soda
</table>

### Database  
For development of this application, [SQLite](https://www.sqlite.org/index.html) was used due to its flexibility as a `zero-configuration` and `self-contained` database engine.

In production, it is [recommended](https://www.sqlite.org/whentouse.html) to utilize a SQL Database engines such as MySQL, PostGreSQL, etc. For my deployment of this application, I utilized `MySQL` through the provisioning of `JAWSDB` on `Heroku`

#### SQL vs NoSQL
In the development of this project, a SQL Database was utilized as the main platform for hosting the data. In hindsight, I believe that a NoSQL database would have been the correct choice due to the flexibility of data models and because my application does not require any relational mapping of the tables.

### Models
This application relies on the Data Models of `Soda` and `Transaction`.

```js
Soda {
  label: String,
  price: Number,
  description: String,
  quantity: Number
}

Transaction {
  label: String,
  price: Number
}
```

The models are then created as instances via [`Sequelize`](https://sequelize.org/)


### Stretch Goals
- In the API for purchasing a soda, the api is sending back an object that is a representation of the soda purchased. The client then creates an `a` tag to initiate the function `downloadJSON` to download the JSON file on the client. This method utilizes more resources on the browser and may stress mobile clients. It would be more appropriate to download from the server itself utilizing the method [`res.download`](https://github.com/expressjs/express/blob/master/examples/downloads/index.js)
- Convert database solution to utilize `mongoose` package since current application does not rely extensibly on relational mapping and it would be beneficial to have a more flexible data model.
- Transfer application to a Docker container to make it an executable that can run in any environment
- Configure cors options to only accept origins for `client` 
- Create more tests to ensure quality of code.


# Production
To deploy this application I utilized [Heroku](https://www.heroku.com/home) since they provide add-ons for production SQL databases such as [JAWSDB](https://www.jawsdb.com/) that can easily be placed into the `API`. If no `JAWSDB`

## Configuration
The `Client` during development utilizes the `Server` endpont `http://localhost:4000` for requests. For deployment, ensure that you set the .env variable `REACT_APP_BASE_URL` to your production server. On the Heroku application dashboard, this can be found in `settings` under the section `Config Vars`.

## Deployment
To deploy this application, be sure to have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed. Since this project is a monorepo, we will deploy the client and server individually as their own applications via [Git Subtrees](https://www.atlassian.com/git/tutorials/git-subtree)

### Client
1. Create a Heroku application
```console
heroku create <optional-name>
```
2. Utilizing the project endpoint, create a new git remote through this command
```console
git remote add client <client-heroku-endpoint>
```
3. Push the project the `client` remote via
```console
npm run deploy-client
```
### Server
1. Create a Heroku application
```console
heroku create <optional-name>
```
2. Utilizing the project endpoint, create a new git remote through this command
```console
git remote add server <server-heroku-endpoint>
```
3. Push the project the `server` remote via
```console
npm run deploy-server
```

# Available Scripts
```console
npm run quickstart    - runs install script then start script
npm run install       - install dependencies in application
npm start             - runs seed script and develop script
npm run develop       - starts client and api development servers
npm run client        - starts client development server
npm run server        - starts server api and interface servers
npm run seed          - seeds sqlite database
npm run deploy-client - deploys client build to heroku endpoint
npm run deploy-server - deploys server build to heroku endpoint
npm run lint          - runs linter on client and server
npm run test          - runs tests on client and server
npm run prepare       - prepares git hooks with husky
npm run build         - runs build scripts of client and api-interface
```

# Technologies Used
- [React](https://reactjs.org/): JavaScript Framework for UI Interfaces
- [Sequelize](https://sequelize.org/): Object Relational Mapper for SQL
- [NodeJS](https://nodejs.org/en/): JavaScript Server Runtime Environment
- [Express](https://expressjs.com/): JavaScript Web Framework
- [Heroku](https://www.heroku.com/home): Cloud Application Platform to applications
- [ESLint](https://eslint.org/): JavaScript Linter to identify issues and conform style
- [Husky](https://www.npmjs.com/package/husky): NPM package to run project scripts with Git Hooks
- [Axios](https://axios-http.com/docs/intro): promise based HTTP client for the Browser and NodeJS
- [CORS](https://www.npmjs.com/package/cors): NPM package to enable Cross Origin Resource Sharing on the server.

# Project Stretch Goals
- Utilize [Continuous Integration](https://www.atlassian.com/continuous-delivery/continuous-integration) in the project for future codebase development.
- Several eslint configs have rules turned off, turn them on in the future

## Links
[Client](https://soda-machine-dchicchon.herokuapp.com/)
<br>
[Server](https://soda-machine-server-dchicchon.herokuapp.com/)
