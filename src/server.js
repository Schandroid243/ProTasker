/* global process */
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const connectDB = require('./config/db');

// Fonction utilitaire pour les logs
function log(message) {
  const prefix = cluster.isMaster ? '[MASTER]' : `[WORKER ${process.pid}]`;
  console.log(`${prefix} ${message}`);
}

if (!cluster.isMaster && cluster.worker.id === 1) {
  require('./src/jobs/cleanupJob');
}

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  log(`Processus maître lancé`);
  log(`Création de ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    log(
      `Worker ${worker.process.pid} mort (code: ${code}, signal: ${signal}). Redémarrage...`,
    );
    cluster.fork();
  });
} else {
  // Worker processes run the app
  const app = require('./app');
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
        console.log(`Worker ${process.pid} listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      log(`Erreur de connexion à MongoDB : ${err.message}`);
      process.exit(1);
    });
}
