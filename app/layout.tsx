import { Footer, Navbar, Provider } from '@/components';
import CustomThemeProvider from '@/components/theme/CustomThemeProvider';
import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

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
        <body className='app bg-slate-50 dark:bg-[#0b1120]'>
          <CustomThemeProvider>
            <main>
              <Navbar />
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-left"
              reverseOrder={false}
            />
          </CustomThemeProvider>
        </body>
      </html>
    </Provider>
  )
}
