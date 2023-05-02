const path = require('path');
const chalk = require('./utils/chalk');
const log = console.log;
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
  //   Handlebars.registerHelper('isMatching', function(postID, threadID, options){
  //     if (postID === threadID) {
  //         return options.fn(this);
  //     }
  //     return options.inverse(this);
  // })

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); 

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        log(chalk.greenBright.bold.bgMagenta(`Listening on http://localhost:${PORT}`))
    })
});