import packageJson from '../../package.json'

export const ENV = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV,

  VERSION: packageJson.version,
  SUPABASE_URL: import.meta.env.VITE_APP_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_APP_SUPABASE_KEY,
  SUPABASE_BUCKET_NAME: import.meta.env.VITE_APP_SUPABASE_BUCKET_NAME,
}
