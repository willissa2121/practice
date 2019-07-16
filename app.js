var express = require("express");
var path = require('path')
var exphbs = require("express-handlebars");
var mysql = require('mysql')



var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");

var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Passwordsucks!1",
    database: "practice_db"
  });
}

app.get('/login'), (req, res) => {
  res.render('login')
}


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let email = req.body.email;
  checkEmail(email, req.body, res)

})

app.get('/survey', (req, res) => {
  res.render('survey')
})

app.get('/landing', (req, res) => {
  res.render('landing')
})

app.get('/failed', (req, res) => {
  res.render('/failed')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/login/fail', (req, res) => {
  res.render('login-fail')
})

app.post('/login', (req, res) => {
  authenticateUser(req.body, res)
})
app.post('/login-fail', (req, res) => {
  authenticateUser(req.body, res)
})

app.post('/survey', (req, res) => {
  console.log(req.body)
  updateUser(req.body)
})

let checkDate = () => {
  db.users.findAll({
    attributes: ['userBornToday', 'updatedAt'],
    where: {
      id: 1
    }
  }).then(response => {
    let date = new Date()
    console.log(date, response[0].dataValues.updatedAt)
    if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      console.log('true');
    }
    else {
      console.log('false');
    }
  })
}
checkDate()



let authenticateUser = (x, a) => {

  db.users.findAll({
    where: {
      email: x.email
    }
  }).then((response) => {
    console.log(x.password, response)
    if (x.password === response[0].password && response[0].userBorn == 0) {
      a.redirect('/survey')
    }
    else if (x.password === response[0].password && response[0].userBorn === 1) {
      a.redirect('/landing')
    }
    else {
      a.redirect('login/fail')
    }
  })
}


let checkEmail = (a, b, c) => {
  let empty = []
  db.users.findAll({
    attributes: ['email']
  }).then(function (response) {
    for (var i = 0; i < response.length; i++) {
      empty.push(response[i].dataValues.email)
    }
    console.log(empty)
    if (empty.indexOf(a) === -1) {
      db.users.create({
        name: b.firstName + b.lastName,
        email: b.email,
        password: b.password,
        phoneNumber: b.phone,
      }).then(function (response) {
        console.log('look')
        c.redirect('/login')
      })
    }
    else {
      console.log('fail')
      c.redirect('/failed')
    }
  })
}

let updateUser = (x) => {
  db.users.update({
    age: x.age,
    gender: x.gender,
    height: x.height,
    weight: x.weight,
    weightGoal: x.goal,
    userBorn: 1
  },
    { where: { email: x.username } }
  ).then(function (data) {
    console.log(data)
  })
}


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
