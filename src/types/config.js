export type ConfigError = { status: 'error', errorCode: number, errorString: string };

export type ConfigProper = { status: 'ok' };

export type ConfigStatus = ConfigProper | ConfigError;
