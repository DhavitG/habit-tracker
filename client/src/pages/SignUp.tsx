import { useState } from "react";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signup`,
        {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      // token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/habits-dashboard";
    } catch (e) {
      console.error("Signup failed:", e);
      alert(e.response?.data?.message || "Signup failed");
    }
  };

  const benefits = [
    "Track unlimited habits",
    "Visual progress heatmaps",
    "Streak tracking & motivation",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-purple-500 mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">Start building better habits today</p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-gray-100">
            <div className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium block text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 h-11 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium block text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 h-11 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium block text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 h-11 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-green-500 hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-green-500 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms}
                className={`w-full h-11 rounded-lg text-base font-medium text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                  formData.agreeToTerms
                    ? "bg-green-500 hover:bg-green-600 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => console.log("Google signup")}
                className="h-11 px-4 rounded-lg border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all font-medium text-sm text-gray-700 flex items-center justify-center"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-green-500 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-50 via-purple-50 to-orange-50 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your Journey to Better Habits
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join thousands of people who are transforming their lives, one
              habit at a time.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-800 italic leading-relaxed mb-2">
                  "This app completely changed how I approach my daily routine.
                  Best habit tracker I've used!"
                </p>
                <p className="text-sm text-gray-600">
                  — Sarah Chen, Product Designer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
