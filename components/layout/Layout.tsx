import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <main>

            </main>
            <Footer />
        </>
    )
}
