import * as express from 'express';
import * as path from 'path';

const app = express();

const port = 4900;

app.listen(port, function() {
	console.log(`Express server listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, '../public')));