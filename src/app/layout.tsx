// src/app/layout.tsx
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Providers from '../components/Providers'; // Import your new client component

export const metadata = {
  title: 'LetterLobby',
  description: 'Draft and send letters to representatives',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

