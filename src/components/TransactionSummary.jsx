import React from 'react';

const TransactionSummary = ({ transactions }) => {
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.amount > 0) {
      acc.income += transaction.amount;
    } else {
      acc.expenses += Math.abs(transaction.amount);
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const balance = summary.income - summary.expenses;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Resumo Financeiro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm text-green-700 font-medium">Receitas</h3>
          <p className="text-2xl text-green-600 font-bold">
            {formatCurrency(summary.income)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm text-red-700 font-medium">Despesas</h3>
          <p className="text-2xl text-red-600 font-bold">
            {formatCurrency(summary.expenses)}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
            Saldo
          </h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
