import "./globals.css";

export const metadata = {
  title: "Frontdesk AI — the front desk that never clocks out",
  description: "An AI receptionist that answers your website visitors 24/7 and captures every lead.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
