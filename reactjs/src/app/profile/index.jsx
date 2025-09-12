import { useContext } from "react";
import { MyContext } from "../../App";
import { User, Mail, Phone, Calendar, Hash } from "lucide-react";

const Profile = () => {
    const { user } = useContext(MyContext);
    
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">No user data available</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-white">
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <p className="text-blue-100">@{user.username}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 space-y-6">
                        <div className="grid gap-4">
                            {/* Email */}
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p className="text-gray-900">{user.phone}</p>
                                </div>
                            </div>

                            {/* User ID */}
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Hash className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">User ID</p>
                                    <p className="text-gray-900 font-mono text-sm">{user._id}</p>
                                </div>
                            </div>

                            {/* Created Date */}
                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                                    <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>

                            {/* Last Updated */}
                            {user.updatedAt !== user.createdAt && (
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                        <p className="text-gray-900">{formatDate(user.updatedAt)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex space-x-3">
                                <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Edit Profile
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;