'use client';

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white py-20 px-6">
      <h1 className="text-4xl font-extrabold mb-8">Pricing Plans</h1>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal">/month</span></p>
          <ul className="mb-6 list-disc list-inside space-y-2">
            <li>Basic mission management</li>
            <li>Up to 3 users</li>
            <li>Email support</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal">/month</span></p>
          <ul className="mb-6 list-disc list-inside space-y-2">
            <li>All Free features</li>
            <li>Unlimited users</li>
            <li>Advanced reporting & analytics</li>
            <li>Priority support</li>
          </ul>
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Upgrade Now
          </button>
        </div>
        <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
          <p className="text-4xl font-bold mb-6">Contact Us</p>
          <ul className="mb-6 list-disc list-inside space-y-2">
            <li>Custom integrations</li>
            <li>Dedicated account manager</li>
            <li>24/7 support</li>
            <li>Service level agreements</li>
          </ul>
          <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition">
            Contact Sales
          </button>
        </div>
      </div>
    </main>
  );
}
