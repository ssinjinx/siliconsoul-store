import Link from 'next/link';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen text-white">
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl font-bold mb-4 lime-glow">Premium SaaS for Developers</h1>
          <p className="text-xl text-lime-400/80 mb-12">Tools and services to power your next project</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="block lime-card rounded-xl p-6 group"
              >
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-lime-400 transition">
                  {product.name}
                </h2>
                <p className="text-lime-400/70 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-lime-400">${product.price}</span>
                  <span className="text-lime-400/50">/month</span>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lime-400/50 text-lg">No products available yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
