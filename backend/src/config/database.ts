import { Pool } from 'pg';

export const pool = new Pool({
  user: 'csi2532_ehotel',
  host: 'ehotel.ddns.net',
  database: 'ehotel',
  password: 'ehotel',
  port: 5432,
});
