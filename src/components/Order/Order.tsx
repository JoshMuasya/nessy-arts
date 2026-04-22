"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import SectionHeading from "../Home/SectionHeading";
import Stepper, { Step } from "../Stepper";

const sizes = ["A5", "A4", "A3", "A2"];

export default function OrderStepperForm() {
    const searchParams = useSearchParams();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        size: searchParams.get("size") || "A4",
        notes: "",
    });

    const [file, setFile] = useState<File | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const update = (field: string, value: string) =>
        setForm((p) => ({ ...p, [field]: value }));

    // ✅ Step validation
    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                if (!form.name.trim() || !form.email.trim()) {
                    toast.error("Name and email are required");
                    return false;
                }
                return true;

            case 2:
                return true;

            case 3:
                if (!file) {
                    toast.error("Please upload a photo");
                    return false;
                }
                return true;

            case 4:
                return true;

            default:
                return false;
        }
    };

    // ✅ Final submit validation
    const handleSubmit = () => {
        if (!form.name.trim() || !form.email.trim()) {
            toast.error("Please fill in required fields");
            return;
        }

        if (!file) {
            toast.error("Please upload a photo");
            return;
        }

        toast.success("Order submitted! We'll contact you shortly.");

        setForm({
            name: "",
            email: "",
            phone: "",
            size: "A4",
            notes: "",
        });

        setFile(null);
        setCurrentStep(1);
    };

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="container mx-auto px-4 max-w-2xl">
                <SectionHeading
                    title="Order a Portrait"
                    subtitle="Fill in the details and we'll bring your photo to life"
                />

                <Stepper
                    initialStep={1}
                    nextButtonText="Next"
                    backButtonText="Back"
                    onNextStep={(step) => {
                        switch (step) {
                            case 1:
                                if (!form.name.trim() || !form.email.trim()) {
                                    toast.error("Name and email are required");
                                    return false;
                                }
                                return true;

                            case 3:
                                if (!file) {
                                    toast.error("Please upload a photo");
                                    return false;
                                }
                                return true;

                            default:
                                return true;
                        }
                    }}
                    onFinalStepCompleted={handleSubmit}
                >
                    {/* Step 1 */}
                    <Step>
                        <div className="space-y-4 pb-12">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => update("name", e.target.value)}
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="you@email.com"
                                />
                            </div>
                        </div>
                    </Step>

                    {/* Step 2 */}
                    <Step>
                        <div className="space-y-4 pb-12">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => update("phone", e.target.value)}
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="+1 234 567 890"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Portrait Size
                                </label>
                                <div className="flex gap-3 flex-wrap">
                                    {sizes.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => update("size", s)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${form.size === s
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Step>

                    {/* Step 3 */}
                    <Step>
                        <div className="pb-12">
                            <label className="block text-sm font-medium mb-2">
                                Upload Photo *
                            </label>

                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {file ? file.name : "Click to upload your photo"}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        JPG, PNG up to 10MB
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        setFile(e.target.files?.[0] || null)
                                    }
                                />
                            </label>
                        </div>
                    </Step>

                    {/* Step 4 */}
                    <Step>
                        <div className="space-y-4 pb-12">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Special Notes
                                </label>

                                <textarea
                                    value={form.notes}
                                    onChange={(e) =>
                                        update("notes", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Any special instructions..."
                                />
                            </div>
                        </div>
                    </Step>
                </Stepper>

                {/* ✅ OUTSIDE */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    Prefer quick ordering?{" "}
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline"
                    >
                        Order on WhatsApp →
                    </a>
                </p>
            </div>
        </div>
    );
}