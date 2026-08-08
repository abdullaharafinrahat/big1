import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 25,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: env.NODE_ENV === 'production' && !env.DATABASE_URL.includes('localhost') ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (env.NODE_ENV === 'development' && duration > 100) {
      console.log(`Slow query (${duration}ms):`, text.slice(0, 100));
    }
    return res;
  } catch (error) {
    console.error('Database query error:', { query: text.slice(0, 150), error: error.message });
    throw error;
  }
}

export async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function testDatabaseConnection() {
  try {
    const res = await pool.query('SELECT NOW() AS now, version()');
    return { connected: true, serverTime: res.rows[0].now, version: res.rows[0].version };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}
