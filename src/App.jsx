import React, { useState, useEffect } from 'react';
import { saveTransactions, loadTransactions } from './utils/localStorage';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TransactionSummary from './components/TransactionSummary';
import TransactionChart from './components/TransactionChart';
import CategoryManager from './components/CategoryManager';

const App = () => {
  const [transactions, setTransactions] = useState(loadTransactions());
  const [view, setView] = useState('transactions');
  const [categories] = useState([
    'Alimentação', 'Transporte', 'Moradia', 'Lazer', 
    'Saúde', 'Educação', 'Investimentos', 'Outros'
  ]);

  const handleClose = () => window.close();
  const handleMinimize = () => window.electronAPI.minimize();
  const handleMaximize = () => window.electronAPI.maximize();

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...updatedTransaction, id } : t
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Title Bar */}
      <div className="bg-gray-800 text-white flex justify-between items-center p-2 drag">
        <div className="text-sm font-semibold">Financial Org</div>
        <div className="flex space-x-2">
          <button onClick={handleMinimize} className="hover:bg-gray-700 px-3 py-1 rounded">-</button>
          <button onClick={handleMaximize} className="hover:bg-gray-700 px-3 py-1 rounded">□</button>
          <button onClick={handleClose} className="hover:bg-red-600 px-3 py-1 rounded">×</button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <nav className="flex justify-center space-x-4 p-4">
          <button 
            onClick={() => setView('transactions')}
            className={`px-4 py-2 rounded transition-colors ${view === 'transactions' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Transações
          </button>
          <button 
            onClick={() => setView('categories')}
            className={`px-4 py-2 rounded transition-colors ${view === 'categories' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Categorias
          </button>
          <button 
            onClick={() => setView('charts')}
            className={`px-4 py-2 rounded transition-colors ${view === 'charts' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Gráficos
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Organizador Financeiro
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {view === 'transactions' && (
              <>
                <TransactionForm 
                  addTransaction={addTransaction} 
                  categories={categories}
                />
                <TransactionSummary transactions={transactions} />
              </>
            )}
            {view === 'categories' && (
              <CategoryManager 
                categories={categories}
                transactions={transactions}
              />
            )}
            {view === 'charts' && (
              <TransactionChart 
                transactions={transactions}
                categories={categories}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {view === 'transactions' && (
              <TransactionList 
                transactions={transactions}
                onDelete={deleteTransaction}
                onEdit={editTransaction}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;