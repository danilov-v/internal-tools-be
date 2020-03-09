import * as express from 'express';
import config from './common/config';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
