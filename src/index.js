import 'regenerator-runtime/runtime.js';
import grpc from 'grpc';
import modules from './modules';
// import protoLoader from '@grpc/proto-loader';
const protoLoader = require('@grpc/proto-loader');

/**
 * Starts the server.
 */
async function loadServer() {
    console.log('Loading server');
    const packageDefinition = await protoLoader.load(
        __dirname + '/../protos/NyaapiService.proto',
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        },
    );
    return grpc.loadPackageDefinition(packageDefinition).Nyaapi;
}

/**
 * Returns the gRPC server.
 */
async function getServer() {
    const server = new grpc.Server();
    const nyaapi = await loadServer();
    server.addService(nyaapi.Nyaapi.service, {
        getLatestEpisodes: modules.getLatestEpisodesHandler,
    });
    return server;
}

getServer().then((server) => {
    server.bind('172.26.179.58:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('The server has started!');
}).catch((error) => console.log(error));
