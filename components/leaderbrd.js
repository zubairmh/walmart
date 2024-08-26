import React from "react";

const Leaderboard = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.cases - a.cases);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full bg-gray-100 rounded-lg">
        <thead>
          <tr>
            <th className="p-2">Decease</th>
            <th className="p-2">State</th>
            <th className="p-2">Cases</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((caseData, index) => (
            <tr key={index}>
              <td className="p-2">{caseData.decease}</td>
              <td className="p-2">{caseData.state}</td>
              <td className="p-2">{caseData.cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
