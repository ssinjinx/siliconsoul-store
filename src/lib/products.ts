import { db } from '@/db';
import { products as productsTable, type Product } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getProducts(): Promise<Product[]> {
  return db.select().from(productsTable);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const [result] = await db.select().from(productsTable).where(eq(productsTable.slug, slug));
  return result;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const [result] = await db.select().from(productsTable).where(eq(productsTable.id, id));
  return result;
}
