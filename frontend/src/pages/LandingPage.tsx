import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const lineData = [
  { month: 'Jan', savings: 1000 },
  { month: 'Feb', savings: 1500 },
  { month: 'Mar', savings: 2000 },
  { month: 'Apr', savings: 2500 },
  { month: 'May', savings: 3000 },
  { month: 'Jun', savings: 3500 },
];


const pieData = [
  { name: 'Savings', value: 400 },
  { name: 'Expenses', value: 600 },
];

const COLORS = ['#FF8343', '#3B82F6'];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20 roun">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Finances</h1>
            <p className="text-xl mb-8">Manage your budget, track expenses, and achieve financial goals with FinManage.</p>
            <a href="/register" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expense Tracking', description: 'Easily categorize and track all your daily expenses.' },
              { title: 'Budget Planning', description: 'Plan your monthly budget to stay on top of your finances.' },
              { title: 'Secure and Private', description: 'Your data is encrypted and protected at all times.' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-5xl font-bold mb-4" style={{ color: index % 2 === 0 ? '#FF8343' : '#3B82F6' }}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Visualize Your Finances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80">
              <h3 className="text-xl font-semibold mb-4 text-center">Savings Growth</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80">
            <h3 className="text-xl font-semibold mb-4 text-center">Savings vs Expenses</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "FinManage helped me get out of debt in just 6 months! Highly recommended.", author: "John Doe" },
              { quote: "The budgeting tools are simple yet effective. A must-have for anyone managing their finances.", author: "Sarah Lee" },
              { quote: "I love the expense tracking feature. It's intuitive and keeps me on track every day!", author: "Kevin Hart" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control?</h2>
          <p className="text-xl mb-8">Sign up now and start managing your finances like a pro.</p>
          <a href="/register" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;