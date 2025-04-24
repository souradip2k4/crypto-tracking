import React, { useEffect } from 'react';
import CryptoTable from './components/CryptoTable';
import { mockWebSocket } from './utils/mockWebSocket';

const App: React.FC = () => {
  useEffect(() => {
    // Connect to mock WebSocket when component mounts
    mockWebSocket.connect();

    // Clean up when component unmounts
    return () => {
      mockWebSocket.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Crypto Price Tracker</h1>
        <p className="text-gray-600">Real-time cryptocurrency market data</p>
      </header>

      <CryptoTable />

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Data refreshes automatically every 1.5 seconds</p>
        <p className="mt-2">© 2025 Crypto Price Tracker</p>
      </footer>
    </div>
  );
};

export default App;