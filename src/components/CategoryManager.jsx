import React from 'react';

const CategoryManager = ({ categories, transactions }) => {
  // Calcular o total de gastos por categoria
  const categoryTotals = categories.reduce((acc, category) => {
    const total = transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    acc[category] = total;
    return acc;
  }, {});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Análise por Categoria</h2>
      <div className="space-y-4">
        {categories.map(category => {
          const total = categoryTotals[category];
          const percentage = transactions.length > 0
            ? (total / transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) * 100).toFixed(1)
            : 0;

          return (
            <div key={category} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{category}</h3>
                <span className="text-gray-600">{formatCurrency(total)}</span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {percentage}% do total
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManager;
