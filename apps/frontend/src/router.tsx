import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './modules/auth/LoginPage';
import RegisterPage from './modules/auth/RegisterPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import WalletPage from './modules/wallet/WalletPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <DashboardPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/wallet',
                element: <WalletPage />,
            },
        ],
    },
]);

export default router;
