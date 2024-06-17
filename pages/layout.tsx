import { ReactNode } from 'react';
import NavBar from './components/NavBar';

export default function Layout({
  children,
  colorMode,
}: Readonly<{
  children: ReactNode;
  colorMode: { toggleColorMode: () => void };
}>) {
  return (
    <>
      <NavBar colorMode={colorMode} />
      <main>{children}</main>
    </>
  );
}
