const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const db = require('./db')
const path = require('path');

app.use(cookieSession({
  secret: `secret is secret`,
  maxAge: 99999999999
}));

app.use(bodyParser.json());
app.use(express.static('public'));

if(process.env.NODE_ENV === 'production') {
  console.log(`on production`)
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
  res.send(`HELLO WORLD`)
})

app.post('/addParticipant', (req, res) => {
	db.addParticipant(req.body.is_admin, req.body.ip, req.body.name, req.body.selectedOption.value, req.body.is_it, req.body.is_positive, req.body.password)
		.then(function(result) {
			console.log(`result is ${result}`)
		})
		.then(function () {
      res.json({
        success: true
      });
    }).catch(function (err) {
      console.log(err);
    });
})

app.post('/getParticipant', (req, res) => {
	db.getParticipant(req.body.ip).then((resp) => {
		if (resp.rowCount != 0) {
			// return resp.rows[0].name
			res.json({
				success: true,
				name: resp.rows[0].name
			})
		} else {
			res.json({
				success: false				
			})
		}		
	})
	.catch((e) => {
		console.log(`ERROR AT POST GET PARTICIPANT ${e}`)
	})
})

app.post('/register', (req, res) => {
  db.toRegister(req.body.admin ? true : false, req.body.first, req.body.last, req.body.email, req.body.password)
    .then(function (result) {
      req.session.first = result.rows[0].first;
      req.session.last = result.rows[0].last;
      req.session.userId = result.rows[0].id;
    })
    .then(function () {
      res.json({
        success: true
      });
    }).catch(function (err) {
      console.log(err);
    });
});

app.post('/login', async (req, res) => {
  let first, last, id, is_admin;
  db.getUserByEmail(req.body.email, req.body.password)
    .then(async function (result) {
      if (result.rows[0]) {
        first = result.rows[0].first;
        last = result.rows[0].last;
        id = result.rows[0].id;
        is_admin = result.rows[0].is_admin;
      } else {
        res.json({ error: true });
        return false;
      }
    }).then(function (result) {
      if (result == false) {
        throw new Error();
      } else {
        req.session.first = first;
        req.session.last = last;
        req.session.userId = id;
        req.session.is_admin = is_admin;
        res.json({
          success: true,
          is_admin: req.session.is_admin
        });
      }
    }).catch(function (err) {
      console.log(`ERROR CATCH ${err}`);
    });
});

app.get('/home', (req, res) => {
  console.log(req.session)
  // if (req.session.userId) {
  //   res.json({ success: true, is_admin: req.session.is_admin })
  // } else {
  //   res.json({ success: false })
  // }
})

app.get('/result', (req, res) => {
	console.log(`getting`)
	db.getResult().then(async function (data){
		res.json(data.rows[0])
	})
})

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client', 'build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
