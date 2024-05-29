import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { Config } from 'infra/config';
import { logger } from 'infra/logger';
import { initRoutes } from './Routes';
import swaggerUi from 'swagger-ui-express';
import docs from './api-doc.json';

class Server {
  readonly app: Express = express();
  readonly port = Config.serverPort;

  async init(): Promise<void> {
    this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));

    this.app.listen(this.port, () => {
      logger.info('Server running on port ' + this.port);
    });

    initRoutes(this.app);
  }
}

export default new Server();
