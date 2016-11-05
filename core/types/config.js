type ConfigError = { status: 'error', errorCode: number, errorString: string };

type ConfigProper = { status: 'ok' };

type ConfigStatus = ConfigProper | ConfigError;
