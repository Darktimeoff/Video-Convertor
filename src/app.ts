import { FFmpegExecuter } from "./commands/ffmpeg/ffmpeg.executer";
import { ConsoleLogger } from "./out/console-logger/console-logger.service";

export class App {
  async run() {
    new FFmpegExecuter(ConsoleLogger.getInstance()).execute();
  }
}

const app = new App();
app.run();
