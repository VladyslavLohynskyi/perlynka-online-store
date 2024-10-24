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
      GOOGLE_CLOUD_BUCKET_NAME: string;
      GOOGLE_CLOUD_PROJECT_ID: string;
      GOOGLE_CLOUD_STORAGE_BASE_URL: string;
      GOOGLE_APPLICATION_CREDENTIALS_JSON?: string;
      GOOGLE_APPLICATION_CREDENTIALS_PATH?: string;
   }
}
