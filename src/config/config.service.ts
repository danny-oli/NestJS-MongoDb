import * as dotenv from 'dotenv';

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getMongoConfig() {
        return {
            uri: `mongodb+srv://${this.get('DATABASE_USER')}:${this.get('DATABASE_PASSWORD')}@cluster0.93lhl.mongodb.net/test`,
        };
    }
}


