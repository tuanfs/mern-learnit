import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/layouts/Landing';
import Auth from './views/Auth';
import AuthProvider from './contexts/AuthContext';
import PostProvider from './contexts/PostContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route
                            path='/login'
                            element={<Auth authRoute='login' />}
                        />
                        <Route
                            path='/register'
                            element={<Auth authRoute='register' />}
                        />
                        <Route path='/dashboard' element={<ProtectedRoute />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                        </Route>
                    </Routes>
                </Router>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
