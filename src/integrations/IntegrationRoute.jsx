import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Integrations } from './integrations';
export { IntegrationLayout };

function IntegrationLayout() {
    const auth = useSelector(state => state.auth.value);

    // redirect to home if already logged in
    if (auth) {
        return <Navigate to="/integrations" />;
    }

    return (
        <div className="container">
            <div className="row">
                <div>
                    <Routes>
                        <Route path="integrations" element={<Integrations />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
