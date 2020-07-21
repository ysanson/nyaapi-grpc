import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
let PROTO_PATH = "NyaapiService.proto";

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });