import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, Home } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        navigate('/');
      } else {
        await login(email, password);
        navigate('/');
      }
    } catch (err: any) {
      if (isSignUp) {
        if (err.code === 'auth/email-already-in-use') {
          setError('This email already has an account. Please log in instead.');
        } else {
          setError(err.message || 'Failed to create account');
        }
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-scaleIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#3d4f5c] rounded-full flex items-center justify-center animate-fadeIn">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#3d4f5c] animate-fadeIn delay-100">
            {isSignUp ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-gray-600 mt-2 animate-fadeIn delay-200">
            {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className={`${error.includes('successfully') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} px-4 py-3 rounded-lg text-sm animate-fadeIn`}>
              {error}
            </div>
          )}

          <div className="animate-fadeIn delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d4f5c] focus:border-transparent transition"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="animate-fadeIn delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3d4f5c] focus:border-transparent transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            {isSignUp && (
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3d4f5c] text-white py-3 rounded-lg font-semibold hover:bg-[#2d3f4c] transition disabled:opacity-50 animate-fadeIn delay-300"
          >
            {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 animate-fadeIn delay-400">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center space-y-3 animate-fadeIn delay-500">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-[#3d4f5c] hover:underline text-sm font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>

          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#3d4f5c] transition text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
