// src/utils/localStorage.js
const STORAGE_KEY = 'financial-org-transactions';

export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const loadTransactions = () => {
  try {
    const transactions = localStorage.getItem(STORAGE_KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};