require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANNON_KEY: process.env.SUPABASE_ANNON_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};