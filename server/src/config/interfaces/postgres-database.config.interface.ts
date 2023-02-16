export interface IsPostgresDatabaseConfig {
  readonly postgresHost: string;
  readonly postgresPort: number;
  readonly postgresUserName: string;
  readonly postgresPassword: string;
  readonly postgresDatabaseName: string;
}
