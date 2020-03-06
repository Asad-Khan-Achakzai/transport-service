export class Path {
    private static path = 'http://localhost:3000';
  
    public static getPath(): string {
      return Path.path;
    }
  }