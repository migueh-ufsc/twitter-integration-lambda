import { default as Database } from 'infra/database/Connection';
import { default as Broker } from 'infra/message-broker/Manager';
import { default as Server } from 'infra/server/Server';
import { TwitterClient } from './twitter/TwitterClient';

(async () => {
  Promise.all([Database.init(), Broker.init(), Server.init()]).then(
    async () => {
      await TwitterClient.validateConnection();
    },
  );
})();
