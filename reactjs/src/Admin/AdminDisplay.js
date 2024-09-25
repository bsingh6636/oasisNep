import { useContext, useEffect, useState } from 'react';
import { BackendPort } from '../Const/url';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './RoutesAdmin';

const AdminDisplay = () => {
    const [isActive, setIsActive] = useState(false);
    const { loginState, setLoginState , setUserInfo } = useContext(Context);
    
    const navigate = useNavigate();
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await fetch(`${BackendPort}/admin/auth`, { credentials: 'include' })
                const data = await response.json();

                if (data.success) {
                    setUserInfo(data.admin)
                    setLoginState(true);
                } else {
                    setLoginState(false);
                    navigate('/admin/login');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                setLoginState(false);
                navigate('/admin/login');
            }

        };

        verifyUser()
    }, [navigate, setLoginState]);

    useEffect(() => {
        if (loginState) {
            navigate('/admin/dashboard');
        } else {
            navigate('/admin/login');
        }
    }, [loginState, navigate]);

    const handleLogout = async () => {
        const response = await fetch(`${BackendPort}/admin/logout`, { credentials: 'include' })
        const data = await response.json();
        setLoginState(false);
    };

    return (
        <div
            className={`p-4 rounded-lg shadow-lg transition-transform transform ${isActive ? 'bg-blue-500 text-white scale-100' : 'bg-gray-100 text-black'}`}
            onClick={() => setIsActive(!isActive)}
        >
            <label className="text-xl font-bold">Admin</label>
            {loginState && (
                <button className='m-1 p-2 rounded-lg bg-red-400 hover:bg-red-600' onClick={handleLogout}>
                    Logout
                </button>
            )}
            <Link to='/admin/whatsNewVdieo'>
            <button className='bg-blue-400 hover:bg-blue-600 p-2 m-1 rounded-lg'>WhatsNew Video</button>
            </Link>
        </div>
    );
};

export default AdminDisplay;
