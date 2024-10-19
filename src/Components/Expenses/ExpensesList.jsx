import React from "react";

const ExpenseList = ({ expenses }) => {
  console.log("list expenmses", expenses);
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Logged Expenses</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-4 py-2 border">
                  {expense.outflow_name || expense.name}
                </td>
                <td className="px-4 py-2 border">
                  {typeof expense.category === "string"
                    ? expense.category
                    : expense.category.name}
                </td>{" "}
                {/* Ensure category is rendered correctly */}
                <td className="px-4 py-2 border">${expense.amount}</td>
                <td className="px-4 py-2 border">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{expense.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border" colSpan="5">
                No expenses logged yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
