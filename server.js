let express = require('express')
let app = express()
const PORT = process.env.PORT || 3000

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
})

app.use(express.static('public'))

app.listen(PORT, serverExpressFn = () => {
	console.log('Express is now running your //localhost:' + PORT)
})