'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function CheckoutButton({ product }: { product: { id: string; name: string; price: number } }) {
  const { userId, isLoaded } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!userId) {
      window.location.href = '/sign-in';
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, userId }),
      });

      const { url, error } = await res.json();
      if (error) {
        alert(error);
      } else if (url) {
        window.location.href = url;
      }
    } catch {
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !isLoaded}
      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
}
