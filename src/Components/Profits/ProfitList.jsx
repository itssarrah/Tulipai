import React from "react";

const ProfitList = ({ profits }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Logged Profits</h3>
      {profits.length === 0 ? (
        <p className="text-gray-500">No profits recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Revenue</th>
                <th className="py-2 px-4 border-b">COGS</th>
                <th className="py-2 px-4 border-b">Operating Expenses</th>
                <th className="py-2 px-4 border-b">Gross Profit</th>
                <th className="py-2 px-4 border-b">Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {profits.map((profit) => (
                <tr key={profit.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{profit.date}</td>
                  <td className="py-2 px-4 border-b">${profit.revenue}</td>
                  <td className="py-2 px-4 border-b">${profit.cogs}</td>
                  <td className="py-2 px-4 border-b">${profit.operating_expenses}</td>
                  <td className="py-2 px-4 border-b">${profit.gross_profit}</td>
                  <td className="py-2 px-4 border-b">${profit.net_profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfitList;