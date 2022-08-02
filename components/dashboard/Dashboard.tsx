import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import classes from './styles/Dashboard.module.scss'
import classnames from 'classnames/bind';
import useUser from 'data/fetchers/auth/useUser';
import Converter from './converter/Converter'
import History from './history/History'
import ShowHistoryButton from './history/ShowHistoryButton';

type DashboardProps = {
}

let cx = classnames.bind(classes);

export default function Dashboard({ }: DashboardProps): JSX.Element {
    // const router = useRouter();
    const { user } = useUser({
        redirectTo: '/'
    });

    // if (user && !user.isLoggedIn) {
    //     router.replace('/');
    // }

    const [showingHistory, setShowingHistory] = useState(false);

    const handleCloseHistory = () => setShowingHistory(false);
    const handleShowHistory = () => setShowingHistory(true);

    return (
        <>
            {
                user && user.isLoggedIn && (
                    <div>
                        <header>
                            <div className={cx("px-3 py-3", classes.dashboardHeader)}>
                                <Container>
                                    <Row>
                                        <Col></Col>
                                        <Col>
                                            <div className="d-flex flex-wrap align-items-center justify-content-center">
                                                <h2 className={cx('text-secondary', classes.dashHeaderText)}>Dashboard</h2>
                                            </div>
                                        </Col>
                                        <Col>
                                            <ShowHistoryButton
                                                handleShow={handleShowHistory}
                                            />
                                        </Col>
                                    </Row>

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
                        <History
                            showing={showingHistory}
                            handleClose={handleCloseHistory}
                        />
                    </div>
                )
            }
        </>
    )
}
