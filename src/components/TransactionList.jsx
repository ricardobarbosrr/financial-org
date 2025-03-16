import React, { useState } from 'react';

const TransactionList = ({ transactions, onDelete, onEdit, categories }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      ...transaction,
      amount: Math.abs(transaction.amount)
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      ...editForm,
      amount: editForm.type === 'expense' ? 
        -Math.abs(parseFloat(editForm.amount)) : 
        Math.abs(parseFloat(editForm.amount))
    };
    onEdit(editingId, updatedTransaction);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredTransactions = transactions
    .filter(t => {
      if (filter === 'income') return t.amount > 0;
      if (filter === 'expense') return t.amount < 0;
      return true;
    })
    .filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transações</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="border rounded-lg p-4">
            {editingId === transaction.id ? (
              <form onSubmit={handleEdit} className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={editForm.type === 'expense'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-red-500">Despesa</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={editForm.type === 'income'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-green-500">Receita</span>
                  </label>
                </div>

                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  value={editForm.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.01"
                  min="0"
                  required
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleChange}
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
                  name="date"
                  value={editForm.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{transaction.description}</h3>
                  <div className="text-sm text-gray-600">
                    <span className="mr-2">{transaction.category}</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(transaction)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;