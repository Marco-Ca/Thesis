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
  console.log(`ADDING PARTICIPANT`)
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
  console.log(`GETTING PARTICIPANT`)
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

app.get('/home', (req, res) => {
  console.log(req.session)
  // if (req.session.userId) {
  //   res.json({ success: true, is_admin: req.session.is_admin })
  // } else {
  //   res.json({ success: false })
  // }
})

app.get('/results', (req, res) => {
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
