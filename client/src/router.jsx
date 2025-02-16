import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './pages/SignUp.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    }
])

export default router