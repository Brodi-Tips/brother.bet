const Routes = require('./Routes');
const App = require('./App.js');

const routes = new Routes();
const app = new App(routes).server;

app.listen(3000);
