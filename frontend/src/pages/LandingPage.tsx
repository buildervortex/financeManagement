import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar
      <header className="bg-white shadow-md">
        <nav className="container flex items-center justify-between p-4 mx-auto">
          <div className="text-2xl font-bold text-blue-600">FinManage</div>
          <ul className="flex space-x-4">
            <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
            <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a></li>
            <li><a href="#cta" className="text-gray-600 hover:text-blue-600">Get Started</a></li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="py-20 text-center text-white bg-blue-600">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold">Take Control of Your Finances</h1>
          <p className="mt-4 text-lg">Manage your budget, track expenses, and achieve financial goals with FinManage.</p>
          <a href="/register" className="inline-block px-6 py-3 mt-8 font-semibold text-blue-600 bg-white rounded-full shadow hover:bg-blue-100">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <i className="text-4xl text-blue-600 fas fa-chart-line"></i>
            <h3 className="mt-4 text-2xl font-semibold">Expense Tracking</h3>
            <p className="mt-2 text-gray-600">Easily categorize and track all your daily expenses.</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <i className="text-4xl text-blue-600 fas fa-bullseye"></i>
            <h3 className="mt-4 text-2xl font-semibold">Budget Planning</h3>
            <p className="mt-2 text-gray-600">Plan your monthly budget to stay on top of your finances.</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <i className="text-4xl text-blue-600 fas fa-lock"></i>
            <h3 className="mt-4 text-2xl font-semibold">Secure and Private</h3>
            <p className="mt-2 text-gray-600">Your data is encrypted and protected at all times.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-600">"FinManage helped me get out of debt in just 6 months! Highly recommended."</p>
              <p className="mt-4 font-bold">- John Doe</p>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-600">"The budgeting tools are simple yet effective. A must-have for anyone managing their finances."</p>
              <p className="mt-4 font-bold">- Sarah Lee</p>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-600">"I love the expense tracking feature. It's intuitive and keeps me on track every day!"</p>
              <p className="mt-4 font-bold">- Kevin Hart</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 text-center text-white bg-blue-600">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">Ready to take control?</h2>
          <p className="mt-4 text-lg">Sign up now and start managing your finances like a pro.</p>
          <a href="/register" className="inline-block px-6 py-3 mt-8 font-semibold text-blue-600 bg-white rounded-full shadow hover:bg-blue-100">Get Started Now</a>
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage;
