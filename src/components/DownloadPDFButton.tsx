"use client";

interface Props {
  label?: string;
  filename?: string;
}

export function DownloadPDFButton({
  label = "Download as PDF",
  filename = "nic-demore-resume",
}: Props) {
  return (
    <a
      href={`/pdfs/${filename}.pdf`}
      download={`${filename}.pdf`}
      className="no-print inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.03] hover:shadow-lg"
      style={{
        background: "var(--color-accent)",
        color: "#fff",
        fontFamily: "var(--font-syne)",
        fontSize: "13px",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(244,99,30,0.32)",
        textDecoration: "none",
      }}
      aria-label={`Download ${label}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M7 1v8M4 6l3 3 3-3M2 11h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}
