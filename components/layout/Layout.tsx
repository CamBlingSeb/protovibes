import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import classes from './styles/Layout.module.scss';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <main className={classes.pageContent}>
                {children}
            </main>
            <Footer />
        </>
    )
}
