import React, { useState } from 'react';

const TransactionList = ({ 
  transactions, 
  onRemoveTransaction, 
  onUpdateTransaction,
  type,
  categories
}) => {
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });

  // Filtra as transações
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateTransaction(editingId, {
      ...editForm,
      amount: Number(editForm.amount)
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      description: '',
      amount: '',
      category: '',
      date: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Filtros */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar transações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas as categorias</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Transações */}
      <div className="space-y-4">
        {filteredTransactions.map(transaction => (
          <div 
            key={transaction.id}
            className={`p-4 rounded-lg ${
              type === 'income' ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            {editingId === transaction.id ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Descrição"
                />
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.01"
                  min="0"
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{transaction.description}</h3>
                    <p className="text-sm text-gray-600">{transaction.category}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${
                      type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      R$ {transaction.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="p-1 text-blue-500 hover:text-blue-600"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => onRemoveTransaction(transaction.id)}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            Nenhuma transação encontrada
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;