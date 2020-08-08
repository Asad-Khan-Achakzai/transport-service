export class Path {
    private static path = 'https://transport-service-server.herokuapp.com';
  
    public static getPath(): string {
      return Path.path;
    }
  }