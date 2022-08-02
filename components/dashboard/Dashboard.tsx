import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './styles/Dashboard.module.scss'
import classnames from 'classnames/bind';
import { CurrentUser } from 'server/lib/session';
import Converter from './converter/Converter'
import History from './history/History'
import ShowHistoryButton from './history/ShowHistoryButton';

type DashboardProps = {
    user: CurrentUser | undefined
}

let cx = classnames.bind(classes);

export default function Dashboard({ user }: DashboardProps): JSX.Element {
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
                            user={user}
                            showing={showingHistory}
                            handleClose={handleCloseHistory}
                        />
                    </div>
                )
            }
        </>
    )
}
