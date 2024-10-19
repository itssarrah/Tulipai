// ExpensesSection.js
import React from 'react';

const ExpensesSection = () => {
  const topCustomers = [
    { name: 'Customer A', amount: 1000 },
    { name: 'Customer B', amount: 1500 },
    { name: 'Customer C', amount: 1200 },
  ];

  return (
    <div>
      <h3>Top Customers</h3>
      <ul>
        {topCustomers.map((customer, index) => (
          <li key={index}>
            {customer.name}: ${customer.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesSection;
