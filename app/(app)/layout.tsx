import ClientLoginInitializer from "@/components/shared/client-login-initializer"
import { FloatingButtons } from "@/components/shared/floating-buttons"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
        <ClientLoginInitializer/>
        {children}
        <FloatingButtons />
    </>
  )
}