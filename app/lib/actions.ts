'use server';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { NameField } from './definitions';

export async function fetchSuggestions(term: string) {
  noStore;
  try {
    const data = await sql<NameField>`
        SELECT DISTINCT
          name
        FROM customers
        WHERE name ILIKE ${`%${term}%`}
      `;

    const names = data.rows;
    console.log(names);
    return names;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all names.');
  }
}
