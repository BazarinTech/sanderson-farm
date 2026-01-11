import ClientLoginInitializer from "@/components/shared/client-login-initializer"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
        <ClientLoginInitializer/>
        {children}
    </>
  )
}