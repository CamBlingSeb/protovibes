import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import classes from './styles/Layout.module.scss';
import useUser from 'data/fetchers/auth/useUser';
import { useRouter } from 'next/router';

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    const router = useRouter();
    const { user } = useUser();

    if (router.route !== '/' && user && !user.isLoggedIn) {
        console.log('Path: ', router.pathname);
        console.log('Route', router.route);
        router.replace('/');
    }

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
