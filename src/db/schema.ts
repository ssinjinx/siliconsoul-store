import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  stripePriceId: text('stripe_price_id'),
  features: text('features'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const purchases = sqliteTable('purchases', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  productId: text('product_id').notNull(),
  stripeSessionId: text('stripe_session_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  productId: text('product_id').notNull(),
  key: text('key').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  lastUsed: integer('last_used', { mode: 'timestamp' }),
});

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
