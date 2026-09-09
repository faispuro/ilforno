// Declaración manual del tipo de archivo de Multer.
// A partir de multer@2.x, el paquete dejó de exponer 'Express.Multer.File'
// de forma automática, así que lo declaramos acá para que TypeScript lo reconozca.
declare namespace Express {
  namespace Multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      stream: NodeJS.ReadableStream;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    }
  }
}