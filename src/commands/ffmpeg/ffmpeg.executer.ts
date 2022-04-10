import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/command-executor/command.executor";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { StreamHandler } from "../../core/handlers/stream.handler";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";

export class FFmpegExecuter extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();

  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const prompt = this.promptService;
    const width = await prompt.input<number>("Ширина", "number");
    const height = await prompt.input<number>("Высота", "number");
    const path = await prompt.input<string>("Путь до файла", "input");
    const name = await prompt.input<string>("Имя", "input");

    return { width, height, path, name };
  }

  protected build({
    width,
    height,
    path,
    name,
  }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, "mp4");
    const builder = new FfmpegBuilder();
    const args = builder.input(path).setVideoSize(width, height).build(output);

    return {
      command: "ffmpeg",
      args,
      output,
    };
  }

  protected spawn({
    command,
    args,
    output,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deletFileIfExtists(output);
    return spawn(command, args);
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const streamhandler = new StreamHandler(logger);
    streamhandler.processOutput(stream);
  }
}
