import { Footer, Navbar } from '@/components'
import '@/styles/globals.css'

export const metadata = {
  title: 'Carshub',
  description: 'Find, book, rent a car—quick and super easy!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='app'>
        <main>
          <Navbar/>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
