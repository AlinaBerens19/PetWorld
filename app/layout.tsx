import './globals.css'
import { Roboto } from "next/font/google"
import RegisterModal from './components/modals/RegisterModal'
import ClientOnly from './ClientOnly'
import LoginModal from './components/modals/LoginModal'
import { getCurrentUser } from './actions/getServerSession'
import CreateAdModal from './components/modals/CreateAdModal'
import Navbar from './components/navbar/Navbar'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const font = Roboto({
  subsets: ['latin'],
  weight: '700'
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <CreateAdModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-10">
          {children}
        </div>
        </body>
    </html>
  )
}
