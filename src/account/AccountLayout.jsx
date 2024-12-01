import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Login, Register } from './';
export { AccountLayout };

function AccountLayout() {
    const auth = useSelector(state => state.auth.value);

    // redirect to home if already logged in
    if (auth) {
        return <Navigate to="/tasks" />;
    }

    return (
        <div className="container">
            <div className="row">
                <div>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
