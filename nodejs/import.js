import { config } from 'dotenv'

config({ path: "./config.env" })

export const MONGO_URI = process.env.MONGO_URI

export const PORT =process.env.PORT || 9999

export const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
export const TWILIO_TOKEN = process.env.TWILIO_AUTHENTICATION_KEY