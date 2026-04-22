"use client";

import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type Testimonial = {
    id: string;
    fullName: string;
    testimonial: string;
    rating: number;
    date: string;
};

const TestimonialsPage = () => {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/testimonials");
                if (!res.ok) throw new Error();

                const data = await res.json();

                setItems(data.result.data);
            } catch {
                setItems([]); // prevent crash
                toast.error("Failed to load testimonials");
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const handleSave = async () => {
        try {
            setSaving(true);

            const url = editing?.id ? `/api/testimonials/${editing.id}` : "/api/testimonials";
            const res = await fetch(url, {
                method: editing?.id ? "PUT" : "POST", // ✅ differentiate
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: editing?.id,
                    ...editing,
                }),
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            // ✅ Update UI immediately
            const savedItem = editing?.id ? data.data : data.testimonial;

            if (editing?.id) {
                setItems((prev) =>
                    prev.map((item) =>
                        item.id === editing.id ? savedItem : item
                    )
                );
            } else {
                setItems((prev) => [...prev, savedItem]);
            }

            setEditing(null);
            setErrors({});
            toast.success("Saved");
        } catch {
            toast.error("Failed to save");
        } finally {
            setSaving(false);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);

            const res = await fetch(`/api/testimonials/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error();

            setItems((prev) => prev.filter((item) => item.id !== id));

            toast.success("Deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
        }
    };

    const inputCls =
        "w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-semibold text-foreground">
                    Testimonials
                </h1>
                <button
                    onClick={() =>
                        setEditing({
                            fullName: "",
                            testimonial: "",
                            rating: 1,
                            date: new Date().toISOString().split("T")[0],
                        })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} /> Add Testimonial
                </button>
            </div>

            {/* Form */}
            {editing && (
                <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg font-semibold text-foreground">
                            {editing?.id ? "Edit Testimonial" : "New Testimonial"}
                        </h2>
                        <button
                            onClick={() => {
                                setEditing(null);
                                setErrors({});
                            }}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                        <input
                            placeholder="Full Name"
                            value={editing?.fullName || ""}
                            onChange={(e) =>
                                setEditing({ ...editing, fullName: e.target.value })
                            }
                            className={inputCls}
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Testimonial */}
                    <div className="space-y-1">
                        <textarea
                            placeholder="Testimonial"
                            value={editing?.testimonial || ""}
                            onChange={(e) =>
                                setEditing({ ...editing, testimonial: e.target.value })
                            }
                            rows={3}
                            className={inputCls + " resize-none"}
                        />
                        {errors.testimonial && (
                            <p className="text-sm text-red-500">{errors.testimonial}</p>
                        )}
                    </div>

                    {/* Rating (Stars) */}
                    <div className="space-y-1">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setEditing({ ...editing, rating: star })
                                    }
                                >
                                    <span
                                        className={
                                            star <= (editing?.rating || 0)
                                                ? "text-yellow-500 text-lg"
                                                : "text-gray-400 text-lg"
                                        }
                                    >
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>
                        {errors.rating && (
                            <p className="text-sm text-red-500">{errors.rating}</p>
                        )}
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                        <input
                            type="date"
                            value={editing?.date || ""}
                            onChange={(e) =>
                                setEditing({ ...editing, date: e.target.value })
                            }
                            className={inputCls}
                        />
                        {errors.date && (
                            <p className="text-sm text-red-500">{errors.date}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setEditing(null);
                                setErrors({});
                            }}
                            className="px-4 py-2 bg-secondary text-muted-foreground rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground text-sm">
                                    {item.fullName}
                                </p>

                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {item.testimonial}
                                </p>

                                <p className="text-xs text-muted-foreground/60 mt-2">
                                    {new Date(item.date).toLocaleDateString()}
                                </p>

                                <p className="text-xs text-yellow-500 mt-1">
                                    ⭐ {item.rating}/5
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0 mt-1">
                                {/* EDIT BUTTON */}
                                <button
                                    onClick={() => setEditing(item)}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Pencil size={15} />
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialsPage;