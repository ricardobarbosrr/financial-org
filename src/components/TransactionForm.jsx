import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction, expenseCategories, incomeCategories }) => {
  const initialFormData = {
    type: 'expense',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      setError('Descrição é obrigatória');
      return false;
    }
    if (!formData.amount || formData.amount <= 0) {
      setError('Valor deve ser maior que zero');
      return false;
    }
    if (!formData.category) {
      setError('Categoria é obrigatória');
      return false;
    }
    if (!formData.date) {
      setError('Data é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onAddTransaction({
      ...formData,
      amount: Number(formData.amount)
    });

    setFormData(initialFormData);
  };

  const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Nova {formData.type === 'expense' ? 'Despesa' : 'Receita'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de Transação */}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === 'expense'}
              onChange={handleChange}
              className="mr-2"
            />
            Despesa
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
              className="mr-2"
            />
            Receita
          </label>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Digite a descrição"
          />
        </div>

        {/* Valor */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            formData.type === 'expense' 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Adicionar {formData.type === 'expense' ? 'Despesa' : 'Receita'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;