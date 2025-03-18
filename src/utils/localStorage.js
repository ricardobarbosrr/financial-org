// Usando as APIs expostas pelo preload.js
console.log('NodeAPI disponível:', window.nodeAPI);

// Verificar se as APIs necessárias estão disponíveis
if (!window.nodeAPI) {
  console.error('API do Node não está disponível. Verifique o preload.js');
}

const fs = window.nodeAPI?.fs;
const path = window.nodeAPI?.path;
const app = window.nodeAPI?.app;

// Obtém o diretório de dados do usuário
let userDataPath;
let FILE_PATH;

try {
  userDataPath = app?.getPath('userData');
  FILE_PATH = path?.join(userDataPath, 'transactions.json');
  console.log('Caminho do arquivo de dados:', FILE_PATH);
} catch (error) {
  console.error('Erro ao obter o caminho do arquivo:', error);
  // Fallback para um caminho padrão
  FILE_PATH = './transactions.json';
}

// Estrutura inicial do arquivo de dados
const initialData = {
  expenses: [],
  incomes: [],
  categories: {
    expenses: [],
    incomes: []
  }
};

// Função para salvar transações no arquivo JSON
export const saveTransactions = (transactions) => {
  try {
    fs?.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2));
    console.log('Transações salvas com sucesso no arquivo JSON!');
  } catch (error) {
    console.error('Erro ao salvar transações no arquivo:', error);
  }
};

// Função para carregar transações do arquivo JSON
export const loadTransactions = () => {
  try {
    if (fs?.existsSync(FILE_PATH)) {
      const fileContent = fs?.readFileSync(FILE_PATH, 'utf-8');
      if (!fileContent) {
        return initialData;
      }
      return JSON.parse(fileContent);
    } else {
      fs?.writeFileSync(FILE_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
  } catch (error) {
    console.error('Erro ao carregar transações do arquivo:', error);
    return initialData;
  }
};

// Função para adicionar uma nova transação
export const addTransaction = (transaction) => {
  try {
    const data = loadTransactions();
    const list = transaction.type === 'expense' ? data.expenses : data.incomes;
    list.push({
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });
    saveTransactions(data);
    return true;
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    return false;
  }
};

// Função para remover uma transação
export const removeTransaction = (id, type) => {
  try {
    const data = loadTransactions();
    const list = type === 'expense' ? data.expenses : data.incomes;
    const index = list.findIndex(t => t.id === id);
    if (index !== -1) {
      list.splice(index, 1);
      saveTransactions(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao remover transação:', error);
    return false;
  }
};

// Função para atualizar uma transação
export const updateTransaction = (id, type, updatedTransaction) => {
  try {
    const data = loadTransactions();
    const list = type === 'expense' ? data.expenses : data.incomes;
    const index = list.findIndex(t => t.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        ...updatedTransaction,
        updatedAt: new Date().toISOString()
      };
      saveTransactions(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    return false;
  }
};

// Função para adicionar uma nova categoria
export const addCategory = (category, type) => {
  try {
    const data = loadTransactions();
    const categoryList = type === 'expense' ? data.categories.expenses : data.categories.incomes;
    if (!categoryList.includes(category)) {
      categoryList.push(category);
      saveTransactions(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    return false;
  }
};

// Função para remover uma categoria
export const removeCategory = (category, type) => {
  try {
    const data = loadTransactions();
    const categoryList = type === 'expense' ? data.categories.expenses : data.categories.incomes;
    const index = categoryList.indexOf(category);
    if (index !== -1) {
      categoryList.splice(index, 1);
      saveTransactions(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao remover categoria:', error);
    return false;
  }
};