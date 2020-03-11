import * as express from 'express';
import * as morgan from 'morgan';
import config from './common/config';
import logger from './common/logger';


const app = express();

app.use(morgan('HTTP/:http-version :method :url - :status (:res[content-length])', {
    stream: {
        write(str: string): void {
            logger.info(str);
        }
    }
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.port, () => logger.info(`Listening on port ${config.port}`));
