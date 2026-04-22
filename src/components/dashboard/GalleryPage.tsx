"use client";

import { uploadGalleryImage } from "@/lib/utils/uploadImage";
import { Edit2, Loader2, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Gallery = {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
};

const GalleryPage = () => {
    const [items, setItems] = useState<Gallery[]>([]);
    const [editing, setEditing] = useState<Partial<Gallery> | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/gallery");
                if (!res.ok) throw new Error();

                const data = await res.json();
                setItems(data.result.data);
            } catch {
                setItems([]);
                toast.error("Failed to load gallery");
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryItems();
    }, []);

    // ---------------------------
    // IMAGE SELECT (NO UPLOAD YET)
    // ---------------------------
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);

        const localUrl = URL.createObjectURL(selected);
        setPreview(localUrl);
    };

    // ---------------------------
    // SAVE (UPLOAD HAPPENS HERE)
    // ---------------------------
    const handleSave = async () => {
        try {
            setSaving(true);
            let imageUrl = editing?.imageUrl || "";

            // Upload only if user selected a new file
            if (file) {
                toast.loading("Uploading image...");
                imageUrl = await uploadGalleryImage(file);
            }

            const url = editing?.id
                ? `/api/gallery/${editing.id}`
                : "/api/gallery";

            const res = await fetch(url, {
                method: editing?.id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...editing,
                    imageUrl,
                }),
            });

            if (!res.ok) throw new Error();

            const data = await res.json();

            // Extract the actual item from the response
            // POST returns { success: true, gallery: {...} }
            // PUT returns { success: true, data: { success: true, data: {...} } }
            const savedItem = editing?.id ? data.data.data : data.gallery;

            if (!savedItem) {
                throw new Error("Invalid server response: savedItem is undefined");
            }

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
            setFile(null);
            setPreview(null);

            toast.success("Saved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    // ---------------------------
    // DELETE
    // ---------------------------
    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);

            const res = await fetch(`/api/gallery/${id}`, {
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
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display text-2xl font-semibold text-foreground">
                    Gallery
                </h1>

                <button
                    onClick={() =>
                        setEditing({
                            title: "",
                            imageUrl: "",
                            category: "pencil",
                        })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
                >
                    <Plus size={16} /> Add Artwork
                </button>
            </div>

            {/* EDIT MODAL */}
            {editing && (
                <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg font-semibold">
                            {editing.id ? "Edit Artwork" : "New Artwork"}
                        </h2>

                        <button
                            onClick={() => {
                                setEditing(null);
                                setFile(null);
                                setPreview(null);
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* TITLE */}
                    <input
                        placeholder="Title"
                        value={editing.title || ""}
                        onChange={(e) =>
                            setEditing((prev) => ({
                                ...prev!,
                                title: e.target.value,
                            }))
                        }
                        className={inputCls}
                    />

                    {/* CATEGORY */}
                    <select
                        value={editing.category || "pencil"}
                        onChange={(e) =>
                            setEditing((prev) => ({
                                ...prev!,
                                category: e.target.value as Gallery["category"],
                            }))
                        }
                        className={inputCls}
                    >
                        {["pencil", "charcoal", "couple", "pets"].map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    {/* FILE INPUT */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className={inputCls}
                    />

                    {/* PREVIEW */}
                    {(preview || editing.imageUrl) && (
                        <div className="border border-border rounded-lg overflow-hidden">
                            <img
                                src={preview || editing.imageUrl}
                                alt="Preview"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                        <button
                            disabled={saving}
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={() => {
                                setEditing(null);
                                setFile(null);
                                setPreview(null);
                            }}
                            className="px-4 py-2 bg-secondary text-muted-foreground rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* GRID */}
            {loading ? (
                <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card border border-border rounded-xl overflow-hidden group"
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-primary capitalize">
                                        {item.category}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditing(item);
                                            setPreview(item.imageUrl);
                                            setFile(null);
                                        }}
                                    >
                                        <Edit2 size={15} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;