import React, { useContext, useState } from 'react';
import { BackendPort } from '../Const/url';
import { Context } from './RoutesAdmin';

const AdminLogin = () => {
    const [emailOruserName, setEmailOruserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setuserName] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { setLoginState } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp && (!email || !userName || !name || !phone || !password)) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (!isSignUp && (!emailOruserName || !password)) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (isSignUp) {
                const signUp = await fetch(`${BackendPort}/api/v1/admin/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, userName, name, phone, password }),
                });
                const response = await signUp.json();
                setSuccessMessage(response.message);
            } else {
                const signIn = await fetch(`${BackendPort}/api/v1/admin/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName: emailOruserName, password }),
                });

                const response = await signIn.json();
                if (response.success) {
                    setLoginState(true);
                }
                if (response.token) {
                    localStorage.setItem('adminToken', response.token);
                    setSuccessMessage(response.message);
                } else {
                    setErrorMessage(response.message);
                }
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className={`text-4xl font-bold text-teal-600 mb-6 text-center transition-transform duration-300 ${isSignUp ? '-translate-y-2' : 'translate-y-0'}`}>
                    {isSignUp ? 'Admin Sign-Up' : 'Admin Login'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <>
                            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField label="userName" type="text" value={userName} onChange={(e) => setuserName(e.target.value)} />
                            <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <InputField label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </>
                    )}
                    {!isSignUp && (
                        <InputField label="Enter Email or userName" type="text" value={emailOruserName} onChange={(e) => setEmailOruserName(e.target.value)} />
                    )}
                    <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-800 transition-transform transform hover:scale-105"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="w-full bg-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition-transform transform hover:scale-105"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, type, value, onChange }) => (
    <div>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);

export default AdminLogin;
