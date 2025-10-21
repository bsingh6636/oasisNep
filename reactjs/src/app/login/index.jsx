import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../component/ui/input";
import { Button } from "../../component/ui/button";
import { postRequest } from "../../services.js/axios";
import { MyContext } from "../../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../component/ui/card";
import { validateInputs } from "./validation";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserCheck, Loader2 } from "lucide-react";

const SIGN_UP_FIELDS = [
  { key: 'fullName', label: 'Full Name', type: 'text', icon: User, placeholder: 'Enter your full name', required: true },
  { key: 'username', label: 'Username', type: 'text', icon: UserCheck, placeholder: 'Choose a username', required: true },
  { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'Enter your email address', required: true },
  { key: 'phone', label: 'Phone', type: 'tel', icon: Phone, placeholder: 'Enter your phone number',required: true },
  { key: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: 'Create a secure password', required: true },
  { key: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: Lock, placeholder: 'Confirm your password', required: true },
];

const SIGN_IN_FIELDS = [
  { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'Enter your email address', required: true },
  { key: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: 'Enter your password', required: true },
];

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  phone: "",
  fullName: "",
};

const AuthPage = () => {
  const { user } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({});

  const isSignIn = location.pathname === '/signin';
  const fieldsToMap = isSignIn ? SIGN_IN_FIELDS : SIGN_UP_FIELDS;

  useEffect(() => {
    if (user?._id) {
      navigate("/user/profile");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error[name]) {
      setError(prev => ({ ...prev, [name]: null }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(isSignIn, formData);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const api = isSignIn ? 'user/signin' : 'user/signup';
      await postRequest(api, formData);
      navigate('/user/profile');
    } catch (err) {
      setError({ api: err.message || "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAuthMode = () => {
    navigate(isSignIn ? '/signup' : '/signin');
    setFormData(INITIAL_FORM_STATE);
    setError({});
    setShowPassword({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0  backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex flex-col items-center space-y-2 mt-3">
              {/* <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div> */}
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {isSignIn ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isSignIn 
                  ? "Sign in to your account to continue" 
                  : "Join us today and get started"
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-4 pb-4" >
            <form onSubmit={handleSubmit} className="space-y-4">
              {error.api && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span>{error.api}</span>
                </div>
              )}

              <div className={`grid gap-4 ${!isSignIn ? 'grid-cols-1 sm:grid-cols-2' : ''}`}>
                {fieldsToMap.map((field) => {
                  const Icon = field.icon;
                  const isPasswordField = field.type === 'password';
                  const showPasswordIcon = isPasswordField && showPassword[field.key];

                  return (
                    <div key={field.key} className={field.key === 'email' || field.key === 'password' || field.key === 'confirmPassword' ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        {field.label} {field.required && <sup className="text-destructive">*</sup>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Icon className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          type={isPasswordField && !showPasswordIcon ? 'password' : isPasswordField ? 'text' : field.type}
                          name={field.key}
                          value={formData[field.key]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`pl-10 pr-10 h-11 transition-all duration-200 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                            error[field.key] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                          }`}
                        />
                        {isPasswordField && (
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(field.key)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPasswordIcon ? (
                              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        )}
                      </div>
                      {error[field.key] && (
                        <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          <span>{error[field.key]}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Sign ${isSignIn ? "In" : "Up"}`
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    {isSignIn ? "New to our platform?" : "Already have an account?"}
                  </span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline" 
                onClick={toggleAuthMode} 
                className="w-full h-11 border-gray-200 text-gray-500 font-medium rounded-lg transition-all duration-200"
              >
                {isSignIn ? "Create New Account" : "Sign In Instead"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional features */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
          {isSignIn && (
            <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto font-normal">
              Forgot your password?
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;