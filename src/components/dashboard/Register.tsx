"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { registerUser } from "@/lib/actions/auth";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected))
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please upload a profile image");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
                profileImage: file,
            });

            toast.success("Account created successfully 🎉");

            router.push("/login"); // or dashboard if auto login
        } catch (err: any) {
            toast.error(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const inputCls =
        "w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm";

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="font-display text-3xl font-semibold">
                        <span className="text-gradient-gold">Nessy</span>{" "}
                        <span className="text-foreground">Art</span>
                    </h1>
                    <p className="text-muted-foreground text-sm mt-2">
                        Create your admin account
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputCls}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@nessyart.com"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={inputCls}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm text-muted-foreground mb-1.5">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className={inputCls}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-primary"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="block text-sm text-muted-foreground mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                            className={inputCls}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-primary"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1.5">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={handleImage}
                            className={inputCls}
                        />
                        {preview && (
                            <img
                                src={preview}
                                className="w-20 h-20 rounded-full object-cover mt-3"
                                alt="preview"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;