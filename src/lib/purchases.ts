import { db } from '@/db';
import { purchases as purchasesTable, apiKeys as apiKeysTable, products as productsTable, type Purchase, type Product, type ApiKey } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

type PurchaseWithProduct = Purchase & { product: Product | null };

export async function getUserPurchases(userId: string): Promise<PurchaseWithProduct[]> {
  const results = await db.select({
    id: purchasesTable.id,
    productId: purchasesTable.productId,
    stripeSessionId: purchasesTable.stripeSessionId,
    createdAt: purchasesTable.createdAt,
    product: productsTable,
  })
    .from(purchasesTable)
    .leftJoin(productsTable, eq(purchasesTable.productId, productsTable.id))
    .where(eq(purchasesTable.userId, userId));

  return results as PurchaseWithProduct[];
}

export async function hasPurchased(userId: string, productId: string): Promise<boolean> {
  const [result] = await db.select()
    .from(purchasesTable)
    .where(and(
      eq(purchasesTable.userId, userId),
      eq(purchasesTable.productId, productId)
    ));
  return !!result;
}

export async function createPurchase(userId: string, productId: string, stripeSessionId: string) {
  const id = uuidv4();
  return db.insert(purchasesTable).values({
    id,
    userId,
    productId,
    stripeSessionId,
  });
}

export async function getApiKeys(userId: string, productId: string): Promise<ApiKey[]> {
  return db.select()
    .from(apiKeysTable)
    .where(and(
      eq(apiKeysTable.userId, userId),
      eq(apiKeysTable.productId, productId)
    ));
}

export async function createApiKey(userId: string, productId: string) {
  const id = uuidv4();
  const key = `sk_${crypto.randomBytes(32).toString('hex')}`;

  await db.insert(apiKeysTable).values({
    id,
    userId,
    productId,
    key,
  });

  return { id, key };
}

export async function deleteApiKey(keyId: string, userId: string) {
  return db.delete(apiKeysTable)
    .where(and(eq(apiKeysTable.id, keyId), eq(apiKeysTable.userId, userId)));
}
