"use client";

import { useState } from "react";

interface ClipboardButtonProps {
    textToCopy: string;
    label: string;
    copiedLabel: string;
    className?: string;
}

export default function ClipboardButton({
    textToCopy,
    label,
    copiedLabel,
    className = "",
}: ClipboardButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`${className} hover:text-lime-400 hover:font-bold ease-out duration-300`}
            type="button"
        >
            {copied ? copiedLabel : label}
        </button>
    );
}
