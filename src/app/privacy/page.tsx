export const metadata = {
  title: 'Privacy Policy - Silicon Soul',
  description: 'Privacy policy for Silicon Soul SaaS products',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen text-white py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 lime-glow">Privacy Policy</h1>

        <div className="space-y-6 text-lime-400/80">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p>We collect information you provide directly to us, including account information when you sign up for an account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing</h2>
            <p>We do not sell or share your personal information with third parties except as necessary to provide our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
