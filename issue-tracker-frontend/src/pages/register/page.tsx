import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signupSchema, type SignUpSchemaType } from "../../validations/signupSchema";
import { useRegister } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const {mutate, isPending: isRegistering} = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = (data: SignUpSchemaType) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...payload } = data;

        mutate(payload, {
            onSuccess: () => {
                toast.success("User registered successfully");
                navigate("/login");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                console.error(error);
                toast.error("User registration failed");
            },
        })
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-secondary">
            <div className="p-12">
                <h1 className="text-gray-300 text-center text-5xl font-extrabold">Issue Tracker System</h1>
            </div>
            <div className="flex flex-col items-center gap-4 bg-gray-100 border p-8 rounded-2xl">
                <h1 className="text-2xl font-medium text-card-foreground/70">Register</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        {/* First Name Field */}
                        <div className="flex flex-col gap-1">
                            <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="first-name"
                            >
                                First Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="first-name"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white text-gray-800"
                                    placeholder="Enter your first name"
                                    type="text"
                                    {...register("firstName")}
                                />
                            </div>
                            {errors.firstName && (
                                <p className="text-xs text-red-500">{errors.firstName.message}</p>
                            )}
                        </div>
                        
                        {/* Last Name Field */}
                        <div className="flex flex-col gap-1">
                            <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="last-name"
                            >
                                Last Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="last-name"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white  text-gray-800 
                                    `}
                                    placeholder="Enter your last name"
                                    type="text"
                                    {...register("lastName")}
                                />
                            </div>
                            {errors.lastName && (
                                <p className="text-xs text-red-500">{errors.lastName.message}</p>
                            )}
                        </div>
                        
                        {/* Email Field */}
                        <div className="flex flex-col gap-1">
                            <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="email"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white text-gray-800
                                    `}
                                    placeholder="you@example.com"
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1">
                            <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white text-gray-800
                                    `}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                    ) : (
                                    <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-1">
                            <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="confirm-password"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all bg-white text-gray-800
                                    `}
                                    placeholder="Confirm your password"
                                    {...register("confirmPassword")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                    ) : (
                                    <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className="cursor-pointer bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isRegistering ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                            </svg>
                            Creating account...
                        </span>
                        ) : (
                        "Create Account"
                        )}
                    </button>

                    {/* Link */}
                    <div className="text-center">
                        <a
                        href="/login"
                        className="text-card-foreground/70 hover:text-card-foreground font-medium transition-colors"
                        >
                        Already have an account? <span className="underline">Sign in</span>
                        </a>
                    </div>
                </form>
            </div>
        
        </div>
    )
}

export default Register
