import { Controller, Get, Param } from '@nestjs/common';
import { CommandService } from './command.service';
import { RequestInterface } from './request.model';

@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService) {}

  @Get('/search/:text')
  async getCommandList(@Param() params): Promise<RequestInterface[]> {
    return this.commandService.search(params.text);
  }

  @Get('/clear')
  async clear(): Promise<RequestInterface[]> {
    return this.commandService.clear();
  }
}
