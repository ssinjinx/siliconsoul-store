import { db } from './index';
import { products as productsTable } from './schema';
import { v4 as uuidv4 } from 'uuid';

const products = [
  {
    id: uuidv4(),
    name: 'API Gateway Pro',
    slug: 'api-gateway-pro',
    description: 'Enterprise-grade API gateway with rate limiting, caching, and analytics. Scale your APIs with confidence.',
    price: 29,
    stripePriceId: '',
    features: JSON.stringify([
      'Unlimited API requests',
      'Rate limiting (10,000/min)',
      'Real-time analytics',
      'Custom domains',
      '99.99% SLA',
    ]),
  },
  {
    id: uuidv4(),
    name: 'Auth Sentinel',
    slug: 'auth-sentinel',
    description: 'Complete authentication solution with OAuth, 2FA, and user management. Secure your app in minutes.',
    price: 19,
    stripePriceId: '',
    features: JSON.stringify([
      'Social login (Google, GitHub, etc.)',
      'Two-factor authentication',
      'User management dashboard',
      'Role-based access control',
      'Audit logs',
    ]),
  },
  {
    id: uuidv4(),
    name: 'Data Pipeline',
    slug: 'data-pipeline',
    description: 'ETL and data integration platform. Move data between services with built-in transformations.',
    price: 49,
    stripePriceId: '',
    features: JSON.stringify([
      '100+ integrations',
      'Visual pipeline builder',
      'Scheduled syncs',
      'Data transformation',
      'Error handling & retry',
    ]),
  },
  {
    id: uuidv4(),
    name: 'Notification Hub',
    slug: 'notification-hub',
    description: 'Unified notification service for email, SMS, push, and webhooks. One API for all channels.',
    price: 15,
    stripePriceId: '',
    features: JSON.stringify([
      'Email, SMS, Push, Webhooks',
      'Template management',
      'Delivery tracking',
      'Bounce handling',
      'Webhook events',
    ]),
  },
];

async function seed() {
  console.log('Seeding database...');

  for (const product of products) {
    await db.insert(productsTable).values(product).onConflictDoNothing();
  }

  console.log('Seeded products:', products.length);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
