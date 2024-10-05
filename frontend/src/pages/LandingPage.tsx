import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      <section className="py-20 text-white bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Take Control of Your Finances</h1>
            <p className="mb-8 text-xl">Manage your budget, track expenses, and achieve financial goals with Finance Management.</p>
            <a href="/register" className="inline-block px-6 py-3 font-semibold text-blue-600 transition duration-300 bg-white rounded-lg shadow-md hover:bg-blue-50">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: 'Expense Tracking', description: 'Easily categorize and track all your daily expenses.' },
              { title: 'Budget Planning', description: 'Plan your monthly budget to stay on top of your finances.' },
              { title: 'Secure and Private', description: 'Your data is encrypted and protected at all times.' },
            ].map((feature, index) => (
              <div key={index} className="p-6 text-center bg-white rounded-lg shadow-md">
                <div className="mb-4 text-5xl font-bold" style={{ color: index % 2 === 0 ? '#FF8343' : '#3B82F6' }}>
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Visualize Your Finances</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-80">
              <h3 className="mb-4 text-xl font-semibold text-center">Savings Growth</h3>
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
            <h3 className="mb-4 text-xl font-semibold text-center">Savings vs Expenses</h3>
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

      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { quote: "Finance Management helped me get out of debt in just 6 months! Highly recommended.", author: "Dhananjaya Wijesekara" },
              { quote: "The user-friendly interface makes it easy to manage all my finances in one place without any confusion.", author: "Sarah De Silva" },
              { quote: "I love the expense tracking feature. It's intuitive and keeps me on track every day!", author: "Ashfah Nazreen" },
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <p className="mb-4 text-gray-600">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-white bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to take control?</h2>
          <p className="mb-8 text-xl">Sign up now and start managing your finances like a pro.</p>
          <a href="/register" className="inline-block px-6 py-3 font-semibold text-blue-600 transition duration-300 bg-white rounded-lg shadow-md hover:bg-blue-50">
            Get Started Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;