import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
  private static instance: ConsoleLogger | undefined;

  // eslint-disable-next-line
    private constructor() {};

  getInstance() {
    if (!ConsoleLogger.instance) {
      // eslint-disable-next-line
      ConsoleLogger.instance = new ConsoleLogger();
    }

    return ConsoleLogger.instance;
  }

  log(...args: any[]) {
    console.log(...args);
  }

  error(...args: any[]): void {
    console.error(args);
  }

  end(): void {
    console.log("Готово");
  }
}
