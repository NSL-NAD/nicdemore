"use client";

interface Props {
  label?: string;
  filename?: string;
}

export function DownloadPDFButton({ label = "Download as PDF", filename = "nic-demore-resume" }: Props) {
  const handleDownload = () => {
    const originalTitle = document.title;
    document.title = filename;
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 500);
    }, 300);
  };

  return (
    <button
      onClick={handleDownload}
      className="no-print inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02]"
      style={{
        background: 'var(--color-accent)',
        color: '#fff',
        fontFamily: 'var(--font-syne)',
        fontSize: '13px',
      }}
      aria-label="Download this page as PDF"
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
    </button>
  );
}
