import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { BrowserRouter, HashRouter } from 'react-router-dom'; // Import HashRouter
import { BrowserRouter } from 'react-router-dom'; // Import HashRouter
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <HashRouter> {/* Use HashRouter instead of BrowserRouter */}
//         <App />
//       </HashRouter>
//     </QueryClientProvider>
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> {/* Use HashRouter instead of BrowserRouter */}
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
