export const metadata = {
  title: 'Terms of Service - Silicon Soul',
  description: 'Terms of service for Silicon Soul SaaS products',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen text-white py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 lime-glow">Terms of Service</h1>

        <div className="space-y-6 text-lime-400/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
            <p>By accessing and using Silicon Soul, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
            <p>Permission is granted to use our services for personal and commercial purposes, subject to the restrictions set forth in these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Subscriptions and Payments</h2>
            <p>Our SaaS products are sold on a monthly subscription basis. Payments are processed securely through Stripe. Subscriptions auto-renew unless cancelled.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p>Silicon Soul shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
