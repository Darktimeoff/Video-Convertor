export class FfmpegBuilder {
  private inputPath: string;

  private outputPath: string;

  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set("-c:v", "libx264");
  }

  input(inputPath: string) {
    this.inputPath = inputPath;
    return this;
  }

  setVideoSize(width: number, height: number) {
    this.options.set("-s", `${width}x${height}`);
  }

  build(outputPath: string) {
    if (!this.inputPath) {
      throw new Error("Не задан параметр input");
    }

    if (!outputPath) {
      throw new Error("Не задан параметр outputPath");
    }

    const args: string[] = ["-i", this.inputPath];
    this.options.forEach((value, key) => {
      args.push(key, value);
    });

    args.push(outputPath);
    return args;
  }
}
