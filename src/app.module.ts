import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';

@Module({
  imports: [CommandModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
