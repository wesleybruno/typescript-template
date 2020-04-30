import { createServer } from 'http';
import ApplicationServer from './server';
import dotenv from 'dotenv'
import signale from 'signale'
dotenv.config()

new ApplicationServer().setupApp().then((app) => {
    const server = createServer(app);

    const PORT = process.env.PORT || 3333

    server.listen(PORT);
    server.on('listening', onListing);
    server.on('error', onError);

    function onListing() {
        signale.complete(`🚀 Server listening on port: ${PORT}`);
    }

    function onError(error: any) {
        signale.error('There was an error:', error);
    }

}).catch((err) => {
    signale.error('Erro ao startar aplicação', err.toString());
    process.exit()
});