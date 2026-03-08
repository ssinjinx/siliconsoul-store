import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import CheckoutButton from './CheckoutButton';

export async function generateStaticParams() {
  return [];
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const features = product.features ? JSON.parse(product.features) : [];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-4xl py-20 px-6">
        <a href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">&larr; Back to products</a>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-400 mb-8">{product.description}</p>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-bold text-white">${product.price}</span>
            <span className="text-gray-500 text-lg">/month</span>
          </div>

          {features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CheckoutButton product={product} />
        </div>
      </div>
    </main>
  );
}
