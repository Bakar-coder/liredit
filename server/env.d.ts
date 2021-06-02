declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    CORS_ORIGIN: string;
    PRIVATE_KEY: string;
    DB_NAME: string;
    DB_TYPE: string;
    DB_PASSWORD: string;
    DB_USER: string;
    DB_HOST: string;
    DB_PORT: string;
    BRAINTREE_MERCHANT_ID: string;
    BRAINTREE_PUBLIC_KEY: string;
    BRAINTREE_PRIVATE_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
  }
}