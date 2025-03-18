// src/utils/localStorage.js
const fs = window.require('fs');
const path = window.require('path');
const { app } = window.require('@electron/remote');

// Obtém o diretório de dados do usuário
const userDataPath = app.getPath('userData');
const FILE_PATH = path.join(userDataPath, 'transactions.json');

// Função para salvar transações no arquivo JSON
export const saveTransactions = (transactions) => {
  try {
    // Salva as transações no arquivo JSON com formatação adequada
    fs.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2));
    console.log('Transações salvas com sucesso no arquivo JSON!');
  } catch (error) {
    console.error('Erro ao salvar transações no arquivo:', error);
  }
};

// Função para carregar transações do arquivo JSON
export const loadTransactions = () => {
  try {
    // Verifica se o arquivo existe
    if (fs.existsSync(FILE_PATH)) {
      // Lê o conteúdo do arquivo
      const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
      // Se o arquivo estiver vazio, retorna um array vazio
      if (!fileContent) {
        return [];
      }
      // Converte o conteúdo JSON em objeto JavaScript
      return JSON.parse(fileContent);
    } else {
      // Se o arquivo não existir, cria um novo com um array vazio
      fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
  } catch (error) {
    console.error('Erro ao carregar transações do arquivo:', error);
    return [];
  }
};