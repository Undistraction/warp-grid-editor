import dotEnv from 'dotenv'

const envPath =
  process.env.ACTIVE_ENV === 'test' ? `.env.test` : `.env.development`

dotEnv.config({
  path: envPath,
  debug: true,
  override: true,
  encoding: 'UTF-8',
})
