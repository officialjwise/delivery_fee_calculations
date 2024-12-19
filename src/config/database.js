
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_ANNON_KEY } = process.env;


const supabase = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY);


module.exports = supabase;