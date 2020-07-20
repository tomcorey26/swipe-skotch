declare namespace NodeJS {
  export interface ProcessEnv {
    FRONTEND_URL: string;
    PORT: string;
    SESS_NAME: string;
    SESS_SECRET: string;
  }
}
