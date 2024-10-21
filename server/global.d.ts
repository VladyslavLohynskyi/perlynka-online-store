namespace NodeJS {
   interface ProcessEnv {
      PORT: string;
      SECRET_KEY_ACCESS: string;
      SECRET_KEY_REFRESH: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
      API_URL: string;
      CLIENT_URL: string;
      MODE: string;
      DATABASE_URL: string;
   }
}
