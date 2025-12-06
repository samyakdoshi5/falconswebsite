import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <PlaneTakeoff size={80} className="text-red-500 mb-6 animate-pulse" />
            <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-blue-200 mb-4">Page Not Found</h2>
            <p className="text-slate-400 mb-8 max-w-md">
                It looks like the requested runway doesn't exist. The aircraft data you're looking for might have been moved or doesn't fly here yet.
            </p>
            <Link
                to="/"
                className="inline-flex items-center bg-tech-accent hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
                Return to Home Base
            </Link>
        </div>
    );
};

export default NotFound;