import { PromptService } from "./core/prompt/prompt.service";

export class App {
  async run() {
    const res = await new PromptService().input<number>("Number", "number");
    console.log("res", res, typeof res);
    return res;
  }
}

const app = new App();
app.run();
