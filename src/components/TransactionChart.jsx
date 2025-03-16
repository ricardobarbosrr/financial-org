import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const TransactionChart = ({ transactions, categories }) => {
  const chartData = useMemo(() => {
    const categoryTotals = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    transactions.forEach(transaction => {
      categoryTotals[transaction.category] += Math.abs(transaction.amount);
    });

    const monthlyData = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expenses: 0 };
      }
      
      if (transaction.amount > 0) {
        monthlyData[monthYear].income += transaction.amount;
      } else {
        monthlyData[monthYear].expenses += Math.abs(transaction.amount);
      }
    });

    return {
      categoryData: {
        labels: categories,
        datasets: [{
          data: categories.map(category => categoryTotals[category]),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB'
          ]
        }]
      },
      monthlyData: {
        labels: Object.keys(monthlyData),
        datasets: [
          {
            label: 'Receitas',
            data: Object.values(monthlyData).map(data => data.income),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          },
          {
            label: 'Despesas',
            data: Object.values(monthlyData).map(data => data.expenses),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          }
        ]
      }
    };
  }, [transactions, categories]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Receitas e Despesas por Mês'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Gastos por Categoria</h2>
        <div className="h-[300px] flex justify-center">
          <Pie data={chartData.categoryData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Histórico Mensal</h2>
        <div className="h-[300px]">
          <Bar options={barOptions} data={chartData.monthlyData} />
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
