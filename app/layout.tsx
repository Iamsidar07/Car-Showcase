import { Footer, Navbar, Provider } from '@/components';
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Carshub',
  description: 'Find, book, rent a car—quick and super easy!',
}

export default function RootLayout({
  children,
  session
}: {
  children: ReactNode,
  session: any
}) {
  return (
    <Provider session={session}>
      <html lang="en">
        <body className='app'>
          <main>
            <Navbar />
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </Provider>
  )
}
