import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinancialAnalytics from './components/FinancialAnalytics';
import TitleBar from './components/TitleBar';
import { loadTransactions, addTransaction, removeTransaction, updateTransaction } from './utils/localStorage';
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from './utils/categories';

function App() {
  const [transactions, setTransactions] = useState({ expenses: [], incomes: [] });
  const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' ou 'analytics'

  useEffect(() => {
    const loadedData = loadTransactions();
    console.log('Loaded Transactions:', loadedData);
    setTransactions(loadedData);
  }, []);

  const handleAddTransaction = (transaction) => {
    const success = addTransaction(transaction);
    if (success) {
      const updatedData = loadTransactions();
      console.log('Transaction Added:', updatedData);
      setTransactions(updatedData);
    }
  };

  const handleRemoveTransaction = (id, type) => {
    const success = removeTransaction(id, type);
    if (success) {
      const updatedData = loadTransactions();
      console.log('Transaction Removed:', updatedData);
      setTransactions(updatedData);
    }
  };

  const handleUpdateTransaction = (id, type, updatedTransaction) => {
    const success = updateTransaction(id, type, updatedTransaction);
    if (success) {
      const updatedData = loadTransactions();
      console.log('Transaction Updated:', updatedData);
      setTransactions(updatedData);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TitleBar />
      <div className="container mx-auto p-4 max-w-4xl flex-grow overflow-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Organizador Financeiro</h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mx-2 rounded ${
              activeTab === 'transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transações
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded ${
              activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Análises
          </button>
        </div>

        {activeTab === 'transactions' ? (
          <>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              expenseCategories={DEFAULT_EXPENSE_CATEGORIES}
              incomeCategories={DEFAULT_INCOME_CATEGORIES}
            />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Receitas</h2>
              <TransactionList
                transactions={transactions.incomes}
                onRemoveTransaction={(id) => handleRemoveTransaction(id, 'income')}
                onUpdateTransaction={(id, transaction) => 
                  handleUpdateTransaction(id, 'income', transaction)
                }
                type="income"
                categories={DEFAULT_INCOME_CATEGORIES}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Despesas</h2>
              <TransactionList
                transactions={transactions.expenses}
                onRemoveTransaction={(id) => handleRemoveTransaction(id, 'expense')}
                onUpdateTransaction={(id, transaction) => 
                  handleUpdateTransaction(id, 'expense', transaction)
                }
                type="expense"
                categories={DEFAULT_EXPENSE_CATEGORIES}
              />
            </div>
          </>
        ) : (
          <FinancialAnalytics 
            transactions={[...transactions.expenses, ...transactions.incomes]} 
          />
        )}
      </div>
    </div>
  );
}

export default App;