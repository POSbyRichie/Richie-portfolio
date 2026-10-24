import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trash2, X, AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  onConfirm: () => Promise<void>;
}

export function DeleteDialog({ open, onOpenChange, projectTitle, onConfirm }: DeleteDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // parent handles errors
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/70"
          style={{ backdropFilter: "blur(4px)" }}
        />
        <Dialog.Content
          className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-3xl border border-white/8 p-8 shadow-2xl"
          style={{ background: "#0f0f1e" }}
        >
          {/* Close */}
          <Dialog.Close
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
            disabled={deleting}
          >
            <X size={18} />
          </Dialog.Close>

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <AlertTriangle size={24} className="text-red-400" />
          </div>

          <Dialog.Title
            className="text-white text-lg font-bold text-center mb-2"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Delete Project?
          </Dialog.Title>

          <Dialog.Description
            className="text-white/45 text-sm text-center mb-7 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            This will permanently delete{" "}
            <span className="text-white/80 font-medium">"{projectTitle}"</span>.
            This action cannot be undone.
          </Dialog.Description>

          <div className="flex gap-3">
            <Dialog.Close
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-all"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              disabled={deleting}
            >
              Cancel
            </Dialog.Close>
            <button
              onClick={handleConfirm}
              disabled={deleting}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                boxShadow: "0 0 20px rgba(239,68,68,0.25)",
              }}
            >
              {deleting ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deleting...</>
              ) : (
                <><Trash2 size={14} /> Delete</>
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
