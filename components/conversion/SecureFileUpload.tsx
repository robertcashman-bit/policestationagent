"use client";

import { useId, useState } from "react";
import { MAX_UPLOAD_BYTES, MAX_UPLOAD_FILES } from "@/lib/enquiry/uploads";

const ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
const ALLOWED_EXT = new Set(["pdf", "jpg", "jpeg", "png"]);

type Props = {
  name?: string;
  label?: string;
  helpText?: string;
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
};

function extOk(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return ALLOWED_EXT.has(ext);
}

export function SecureFileUpload({
  name = "files",
  label = "Upload documents (optional)",
  helpText = "PDF, JPG or PNG only. Maximum 4MB per file, up to 3 files. Files are attached to the enquiry email and are not published.",
  files,
  onChange,
  disabled = false,
  className = "",
}: Props) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  function mergeIncoming(list: FileList | null) {
    if (!list || list.length === 0) return;
    const next = [...files];
    setError(null);
    for (const file of Array.from(list)) {
      if (next.length >= MAX_UPLOAD_FILES) {
        setError(`Maximum ${MAX_UPLOAD_FILES} files allowed.`);
        break;
      }
      if (!extOk(file.name)) {
        setError("Only PDF, JPG, JPEG and PNG files are accepted.");
        continue;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setError("Each file must be 4MB or smaller.");
        continue;
      }
      if (file.size === 0) {
        setError("Empty files are not accepted.");
        continue;
      }
      next.push(file);
    }
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-800 mb-1">
        {label}
      </label>
      <p className="text-xs text-slate-600 mb-2">{helpText}</p>
      <input
        id={inputId}
        name={name}
        type="file"
        accept={ACCEPT}
        multiple
        disabled={disabled}
        className="block w-full text-sm text-slate-700 rounded-md border border-slate-300 px-3 py-2 min-h-[44px] bg-white"
        onChange={(e) => {
          mergeIncoming(e.target.files);
          e.target.value = "";
        }}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {files.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <span className="truncate text-slate-800">
                {file.name}{" "}
                <span className="text-slate-500">({Math.ceil(file.size / 1024)} KB)</span>
              </span>
              <button
                type="button"
                className="text-red-700 font-semibold hover:underline shrink-0"
                onClick={() => removeAt(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
