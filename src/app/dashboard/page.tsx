import { redirect } from 'next/navigation';
import { getUserPurchases, getApiKeys, createApiKey, deleteApiKey } from '@/lib/purchases';
import { auth } from '@clerk/nextjs/server';
import type { Product, ApiKey } from '@/db/schema';

type PurchaseWithProduct = {
  id: string;
  userId: string;
  productId: string;
  stripeSessionId: string | null;
  createdAt: Date;
  product: Product | null;
};

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const purchases: PurchaseWithProduct[] = await getUserPurchases(userId);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-4xl py-20 px-6">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 mb-8">Welcome to your dashboard</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Purchases</h2>

          {purchases.length === 0 ? (
            <p className="text-gray-500">You have not purchased any products yet.</p>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{purchase.product?.name || 'Product'}</h3>
                      <p className="text-gray-500 text-sm">Purchased {new Date(purchase.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">Active</span>
                  </div>

                  <ApiKeySection
                    userId={userId}
                    productId={purchase.productId}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

async function ApiKeySection({ userId, productId }: { userId: string; productId: string }) {
  const keys: ApiKey[] = await getApiKeys(userId, productId);

  async function createKey() {
    'use server';
    await createApiKey(userId, productId);
  }

  async function deleteKey(formData: FormData) {
    'use server';
    const keyId = formData.get('keyId') as string;
    await deleteApiKey(keyId, userId);
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-3">API Keys</h4>

      {keys.length === 0 ? (
        <form action={createKey}>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition">
            Generate API Key
          </button>
        </form>
      ) : (
        <div className="space-y-2">
          {keys.map((key) => (
            <div key={key.id} className="flex items-center justify-between bg-gray-950 rounded-lg p-3">
              <code className="text-sm font-mono text-green-400">{key.key}</code>
              <form action={deleteKey}>
                <input type="hidden" name="keyId" value={key.id} />
                <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
              </form>
            </div>
          ))}
          <form action={createKey}>
            <button className="text-blue-400 hover:text-blue-300 text-sm">Generate New Key</button>
          </form>
        </div>
      )}
    </div>
  );
}
