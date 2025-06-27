import { Server as HttpServer, createServer } from 'http'
import app from './src/app';
import MongoDB from './src/dbs/databases';
import dotenv from 'dotenv'
dotenv.config();
import config from './src/configs/config';

const PORT = 3000;

class Server {
    private server: HttpServer;
    private port: number;
    constructor() { 
        this.server = createServer(app)
        this.port = config.app.port
    }
    public async close(): Promise<void> {
        await MongoDB.disconnect()
        this.server.close(()=>console.log('Server closed'));
        // notify all clients
    }
    public listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            
        });
        process.on('SIGINT', () => {
            this.close();
        });
    }
}

new Server().listen();