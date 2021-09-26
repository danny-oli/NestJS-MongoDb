import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

//Allow this module to be globaly imported
@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule { }