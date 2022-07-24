import type { CurrentUser } from '../../server/lib/session';
import { Container, Accordion, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import classes from './styles/Dashboard.module.scss'
import classnames from 'classnames/bind';
import useUser from 'data/fetchers/auth/useUser';
// import PV_AccordionItem from '../ui/PV_AccordionItem'
import Converter from './converter/Converter'

type DashboardProps = {
}

let cx = classnames.bind(classes);

export default function Dashboard({ }: DashboardProps): JSX.Element {
    const router = useRouter();
    const { user } = useUser({
        redirectTo: '/'
    })

    if (user && !user.isLoggedIn) {
        router.replace('/');
    }

    return (
        <>
            {
                user && user.isLoggedIn && (
                    <div>
                        <header>
                            <div className={cx("px-3 py-3", classes.dashboardHeader)}>
                                <Container>
                                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                                        <h2 className={cx('text-secondary', classes.dashHeaderText)}>Dashboard</h2>
                                    </div>
                                </Container>
                            </div>
                        </header>
                        <section className={cx('py-5', classes.main)}>

                            <Container className={classes.panel}>
                                <Converter />
                            </Container>
                            <div className={classes.skewedCornerLeftOuter}>
                                <div className={classes.skewedCornerLeft}></div>
                            </div>
                            <div className={classes.skewedCornerRightOuter}>
                                <div className={classes.skewedCornerRight}></div>
                            </div>
                        </section>
                    </div>
                )
            }
        </>
    )
}
