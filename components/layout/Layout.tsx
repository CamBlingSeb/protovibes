import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import classes from './styles/Layout.module.scss';
import useUser from '../../data/fetchers/auth/useUser';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    const { user } = useUser();

    return (
        <>
            {user && user.isLoggedIn && <Header user={user} />}
            <main className={classes.pageContent}>
                {children}
            </main>
            <Footer />
        </>
    )
}
