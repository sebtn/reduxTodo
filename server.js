let express = require('express')
let app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.listen(PORT, serverExpressFn = () => {
	console.log('Express is now running your //localhost:' + PORT)
})