# ColaCo

## Summary
This monorepo hosts a full-stack application that can build a soda machine application. The client dispenses sodas from a virtual soda machine and the server hosts an api where an owner can manage their machine through an interface.

## Table of Contents
1. [Photos](#photos)
2. [Start](#start)
3. [Client](#client)
4. [Server](#server)

## Photos

<br/>

<img src='https://media.giphy.com/media/yHRPCtODZadWaeraY5/giphy.gif'/>
<figcaption align='center'><b>Client</b></figcaption>
<br/>
<img src='https://media.giphy.com/media/vMv1HPiaFaATeZl5qk/giphy.gif'/>
<figcaption align='center'><b>API Interface</b></figcaption>


## Start
Enter the command `npm run quickstart` in the project directory to install dependencies for the project and start both the `client` and `server` concurrently.

## Client

### Summary 
The `client` of this project is React application that displays an SVG soda machine that contains a list of sodas retrieved from the `server` through an api call.
### User Actions
#### Purchase Soda
On the `client`, a user can purchase sodas from the vending machine by clicking the button. Upon clicking the button, an api call will be sent to the server requesting to purchase a soda. Upon successful purchase, the browser will trigger the download of `soda.json` which will contain the `id`, `label` and `description` of the soda. In addition to the download, a message will appear on the side of the machine stating the soda label purchased.

### API Calls used
GET `/api/sodas`: retrieves the list of sodas available from the database
<br>
PUT `/api/sodas`: decrements the type of soda purchased in the database then returns the soda information to download as `json`

### Stretch Goals
- Utilize React [`lazy`, `Suspense`](https://reactjs.org/docs/code-splitting.html#reactlazy) to take advantage of code splitting and allow the client to load components as needed with webpack
- Utilize React [`Error Boundary`](https://reactjs.org/docs/error-boundaries.html) to catch JavaScript errors and display fallback UI
- Add additional styling with SVGs or [`Three.js`](https://github.com/pmndrs/react-three-fiber) to page in order to keep users more engaged. 

## Production Links
[Client](https://soda-machine-dchicchon.herokuapp.com/)
<br>
[Server](https://soda-machine-server-dchicchon.herokuapp.com/)