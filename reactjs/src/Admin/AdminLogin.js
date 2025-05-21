import React, { useContext, useState, useEffect } from 'react';
import { BackendPort } from '../Const/url';
import { Context } from './RoutesAdmin';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        emailOrUsername: '',
        email: '',
        username: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [isSignUp, setIsSignUp] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { setLoginState } = useContext(Context);

    // Load saved credentials on component mount
    useEffect(() => {
        const savedUsername = localStorage.getItem('adminUsername');
        const savedRememberMe = localStorage.getItem('adminRememberMe') === 'true';
        
        if (savedUsername && savedRememberMe) {
            setCredentials(prev => ({ ...prev, emailOrUsername: savedUsername }));
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));

        // Evaluate password strength when password field changes
        if (name === 'password') {
            evaluatePasswordStrength(value);
        }
    };

    const evaluatePasswordStrength = (password) => {
        // Password strength evaluation
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const validateForm = () => {
        // Reset error messages
        setErrorMessage('');

        if (isSignUp) {
            // Signup validation
            const { email, username, name, phone, password, confirmPassword } = credentials;
            
            if (!email || !username || !name || !phone || !password || !confirmPassword) {
                setErrorMessage('Please fill in all fields.');
                return false;
            }
            
            if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
                setErrorMessage('Please enter a valid email address.');
                return false;
            }
            
            if (password.length < 8) {
                setErrorMessage('Password must be at least 8 characters long.');
                return false;
            }
            
            if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match.');
                return false;
            }
            
            if (passwordStrength < 3) {
                setErrorMessage('Please use a stronger password with uppercase, numbers, and special characters.');
                return false;
            }
        } else {
            // Login validation
            const { emailOrUsername, password } = credentials;
            
            if (!emailOrUsername || !password) {
                setErrorMessage('Please enter your username/email and password.');
                return false;
            }
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (isSignUp) {
                const { email, username, name, phone, password } = credentials;
                const signUp = await fetch(`${BackendPort}/admin/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, userName: username, name, phone, password }),
                });
                
                const response = await signUp.json();
                
                if (response.success) {
                    setSuccessMessage(response.message || 'Registration successful! You can now log in.');
                    // Auto switch to login after successful signup
                    setTimeout(() => {
                        setIsSignUp(false);
                        setCredentials(prev => ({
                            ...prev,
                            emailOrUsername: username,
                            password: ''
                        }));
                    }, 2000);
                } else {
                    setErrorMessage(response.message || 'Registration failed. Please try again.');
                }
            } else {
                const { emailOrUsername, password } = credentials;
                const signIn = await fetch(`${BackendPort}/admin/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName: emailOrUsername, password }),
                });

                const response = await signIn.json();
                
                if (response.success) {
                    // Save credentials if remember me is checked
                    if (rememberMe) {
                        localStorage.setItem('adminUsername', emailOrUsername);
                        localStorage.setItem('adminRememberMe', 'true');
                    } else {
                        localStorage.removeItem('adminUsername');
                        localStorage.removeItem('adminRememberMe');
                    }
                    
                    // Store token in localStorage
                    if (response.token) {
                        localStorage.setItem('adminToken', response.token);
                    }
                    
                    setSuccessMessage(response.message || 'Login successful!');
                    setLoginState(true);
                } else {
                    setErrorMessage(response.message || 'Invalid credentials. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login/Registration error:', error);
            setErrorMessage('A server error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setCredentials({
            emailOrUsername: '',
            email: '',
            username: '',
            name: '',
            phone: '',
            password: '',
            confirmPassword: '',
        });
        setErrorMessage('');
        setSuccessMessage('');
        setPasswordStrength(0);
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        resetForm();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 p-4">
            <div className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-indigo-500/30">
                {/* Background pattern */}
                <div className="absolute top-0 left-0 w-full h-48 bg-indigo-600 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-indigo-600 transform -skew-y-12 opacity-30"></div>
                </div>

                <div className="relative px-8 pt-10 pb-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 transition-all duration-300">
                            {isSignUp ? 'Create Admin Account' : 'Welcome Back'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isSignUp ? 'Register to access the admin dashboard' : 'Login to your admin account'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isSignUp ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InputField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        icon="email"
                                    />
                                    <InputField
                                        label="Username"
                                        type="text"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        icon="user"
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <InputField
                                        label="Full Name"
                                        type="text"
                                        name="name"
                                        value={credentials.name}
                                        onChange={handleChange}
                                        icon="user"
                                    />
                                    <InputField
                                        label="Phone Number"
                                        type="tel"
                                        name="phone"
                                        value={credentials.phone}
                                        onChange={handleChange}
                                        icon="phone"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={credentials.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                            {credentials.password && (
                                                <>
                                                    <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${
                                                                passwordStrength === 0 ? 'bg-red-500' : 
                                                                passwordStrength === 1 ? 'bg-orange-500' : 
                                                                passwordStrength === 2 ? 'bg-yellow-500' : 
                                                                passwordStrength === 3 ? 'bg-lime-500' : 'bg-green-500'
                                                            }`}
                                                            style={{ width: `${passwordStrength * 25}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {passwordStrength === 0 && 'Very weak - Use at least 8 characters'}
                                                        {passwordStrength === 1 && 'Weak - Add uppercase letters'}
                                                        {passwordStrength === 2 && 'Medium - Add numbers'}
                                                        {passwordStrength === 3 && 'Good - Add special characters'}
                                                        {passwordStrength === 4 && 'Strong password'}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <InputField
                                        label="Confirm Password"
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={credentials.confirmPassword}
                                        onChange={handleChange}
                                        icon="lock"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <InputField
                                    label="Username or Email"
                                    type="text"
                                    name="emailOrUsername"
                                    value={credentials.emailOrUsername}
                                    onChange={handleChange}
                                    icon="user"
                                />
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Error and success messages */}
                        {errorMessage && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{errorMessage}</p>
                            </div>
                        )}
                        
                        {successMessage && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-600">{successMessage}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Switch between login and signup */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={switchMode}
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Input field component with icon support
const InputField = ({ label, type, name, value, onChange, icon }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                autoComplete={type === 'password' ? 'current-password' : name === 'email' ? 'email' : ''}
            />
            {icon && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {/* Icon placeholder - you can replace with actual icons */}
                </span>
            )}
        </div>
    </div>
);

export default AdminLogin;