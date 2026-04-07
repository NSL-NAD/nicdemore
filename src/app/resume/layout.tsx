import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nic DeMore: Resume",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
