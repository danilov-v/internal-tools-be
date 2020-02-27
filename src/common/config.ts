import * as convict from 'convict';

interface Config {
    readonly port: number;
}

function environment(name: string) {
    return 'IT_TOOLS_' + name;
}

const configuration = convict({
    port: {
        doc: 'Port to be used by the app',
        format: 'port',
        default: 3000,
        env: environment('PORT')
    }
}).loadFile('config.json');

const config: Config = {
    port: configuration.get('port')
};

export default config;
