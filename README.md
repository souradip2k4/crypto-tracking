# Crypto Price Tracker

A real-time cryptocurrency price tracking application that displays live market data for various cryptocurrencies.

### Application Video Preview Link
https://youtu.be/J5fVA7Y-dLA?si=fP897INKcE-fMuH6

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/souradip2k4/crypto-tracking
   cd crypto-tracking
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Available Scripts
- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm test` - Run tests with Vitest

## Tech Stack

- **Frontend Framework**: React 19
- **State Management**: Redux (Redux Toolkit)
- **Styling**: TailwindCSS 4
- **Build Tool**: Vite 6
- **Language**: TypeScript
- **Testing**: Vitest with React Testing Library

## Architecture

The application follows a modern React application architecture with the following key components:

### Directory Structure
```
src/
├── api/            # API services and data fetching
├── assets/         # Static assets
├── components/     # React UI components
├── features/       # Feature-based modules (Redux slices)
├── models/         # TypeScript interfaces and types
├── utils/          # Utility functions
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── store.ts        # Redux store configuration
```

### Data Flow Architecture

The application follows a unidirectional data flow pattern:

1. **Data Source Layer**
   - Mock cryptocurrency data is defined in `cryptoService.ts`
   - `MockCryptoWebSocket` class in `mockWebSocket.ts` simulates real-time data updates
   - WebSocket updates are dispatched to the Redux store every 1.5 seconds

2. **State Management Layer**
   - Redux store (configured in `store.ts`) serves as the single source of truth
   - `cryptoSlice.ts` defines the state structure and reducer functions
   - Selectors in `selectors.ts` provide optimized access to specific data views
   - State is persisted to localStorage using utilities in `localStorage.ts`

3. **UI Layer**
   - React components consume state via Redux selectors
   - Components re-render automatically when relevant state changes
   - UI is organized into reusable components (e.g., `CryptoTable`, `PriceChange`, `Chart`)

### Component Architecture

The application uses a component-based architecture:

1. **Container Components**
   - Connect to the Redux store
   - Manage data filtering and transformation
   - Pass data to presentational components

2. **Presentational Components**
   - Focus on rendering UI based on props
   - Handle user interactions
   - Implement responsive design using TailwindCSS

3. **Utility Components**
   - Specialized components for specific UI elements
   - Examples: `PriceChange` (for displaying price changes with color coding), `Chart` (for visualizing price trends)

### Type System

The application uses TypeScript for type safety:

1. **Core Types**
   - `CryptoAsset`: Defines the structure of cryptocurrency data
   - `CryptoState`: Defines the structure of the Redux state

2. **Type Integration**
   - Redux store is fully typed with `RootState` and `AppDispatch` types
   - Component props and state are typed for better development experience
   - Selectors and actions are typed to ensure type safety across the application

### Key Features

1. **Real-time Data Updates**
   - Uses a mock WebSocket implementation to simulate real-time cryptocurrency price updates
   - Updates occur approximately every 1.5 seconds
   - Randomly selects assets to update for realistic simulation
   - Updates prices, change percentages, and trading volumes

2. **State Management**
   - Redux Toolkit for centralized state management
   - Feature-based organization with crypto slice
   - Persists state to localStorage for data persistence between sessions
   - Optimized selectors for derived data (top gainers, top losers)

3. **Responsive UI**
   - Built with TailwindCSS for responsive design
   - Adapts layout for different screen sizes
   - Displays cryptocurrency prices, change percentages, and volume data
   - Provides horizontal scrolling for mobile views

4. **Data Visualization**
   - Displays price changes with color-coded indicators (green for positive, red for negative)
   - Formats large numbers with appropriate suffixes (K, M, B, T)
   - Tabular view of cryptocurrency market data
   - Simple chart visualization for 7-day price trends
