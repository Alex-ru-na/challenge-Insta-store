import * as os from 'os';
import cluster from 'cluster';
import dotenv from 'dotenv-flow';
import Server from './modules/main/app/server';
import { Environments } from './common/utils/helpers/environments';

dotenv.config({ silent: true });

let workers = os.cpus().length;

if (cluster.isMaster) {
  if (process.env.ENVIRONMENT !== Environments.PRODUCTION) {
    workers = 1
  }
  workers = 1

  console.log('[Info] Start cluster with %s workers', workers);

  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log('[Info] Worker %s started.', worker.pid);
  }
  cluster.on('exit', (worker) => {
    console.log('[Info] worker %s died. restart...', worker.process.pid);
    cluster.fork();
  });
} else {
  Server.getInstance()
    .init()
    .then((res: Server) => res.listen())
    .catch(err => console.error(`[Error] Server.getInstance.init(); Error: ${err}`))
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n\n[Error] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('\n\n[Error] Uncaught Exception:', error);
});
