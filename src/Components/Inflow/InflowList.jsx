import React from "react";

const InflowList = ({ inflows }) => {
  console.log("list inflows", inflows); // Log inflows for debugging

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Logged Inflows</h3>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Revenue Name</th>
            <th className="px-4 py-2 border">Category Name</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {inflows.length > 0 ? ( // Check if inflows is not empty
            inflows.map((inflow) => (
              <tr key={inflow.id}>
                <td className="px-4 py-2 border">
                  {new Date(inflow.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {inflow.revenue_name || inflow.name}
                </td>
                <td className="px-4 py-2 border">
                  {inflow.category.name || inflow.category}
                </td>
                <td className="px-4 py-2 border">${inflow.amount}</td>
                <td className="px-4 py-2 border">{inflow.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border" colSpan="5">
                No inflows recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InflowList;
