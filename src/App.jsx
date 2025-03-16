import React from 'react'

function App() {
  const handleClose = () => {
    window.close();
  }

  const handleMinimize = () => {
    window.electronAPI.minimize();
  }

  const handleMaximize = () => {
    window.electronAPI.maximize();
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Custom Title Bar */}
      <div className="bg-gray-800 text-white flex justify-between items-center p-2 drag">
        <div className="text-sm">To-Do Organizador</div>
        <div className="flex space-x-2">
          <button onClick={handleMinimize} className="hover:bg-gray-700 px-3 py-1 rounded">-</button>
          <button onClick={handleMaximize} className="hover:bg-gray-700 px-3 py-1 rounded">□</button>
          <button onClick={handleClose} className="hover:bg-red-600 px-3 py-1 rounded">×</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          To-Do Organizador
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-center">
            Start editing <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> to customize your application
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
