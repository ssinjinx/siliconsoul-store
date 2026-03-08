import Link from 'next/link';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Premium SaaS for Developers</h1>
          <p className="text-xl text-gray-400 mb-12">Tools and services to power your next project</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition group"
              >
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition">
                  {product.name}
                </h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">${product.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products available yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
