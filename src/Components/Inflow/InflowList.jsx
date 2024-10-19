import React from "react";

const InflowList = ({ inflows }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Logged Inflows</h3>
      {inflows.length === 0 ? (
        <p className="text-gray-500">No inflows recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {inflows.map((inflow) => (
                <tr key={inflow.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{inflow.date}</td>
                  <td className="py-2 px-4 border-b">{inflow.name}</td>
                  <td className="py-2 px-4 border-b">{inflow.category}</td>
                  <td className="py-2 px-4 border-b">${inflow.amount}</td>
                  <td className="py-2 px-4 border-b">{inflow.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InflowList;
