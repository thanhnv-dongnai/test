import './globals.css';

export const metadata = {
  title: 'K12 ERP',
  description: 'School management ERP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
