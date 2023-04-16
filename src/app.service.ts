import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHelloName(name: string): string {
    let upperName = name.charAt(0).toUpperCase() + name.slice(1);
    return "Hello " + upperName + "!";
  }
  getHello(): string {
    return "Hello World!";
  }
}
