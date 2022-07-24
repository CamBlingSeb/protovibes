import classes from './styles/History.module.scss'
import classnames from 'classnames/bind';
import {
    Container,
    Row,
    Col,
    Placeholder,
    Stack
} from 'react-bootstrap'

type HistoryItemProps = {}

let cx = classnames.bind(classes);

export default function HistoryItem({ }: HistoryItemProps): JSX.Element {
    return (
        // <div >
        <Container className={classes.historyItemOuter}>
            <Row className='' md={12}>
                <Col md={3} className={classes.thumbnailOuter}>
                    <div className={classes.thumbnailContainer}>

                    </div>
                </Col>
                <Col md={9} className={cx('py-2', classes.historyItemInfo)}>
                    <div>
                        <h3 className='align-text-bottom'>Track Name</h3>
                        <small>Artist Name</small>
                    </div>
                    <div>
                        <Stack direction="horizontal" gap={4}>
                            <div className={classes.buyIcon}></div>
                            <div className={classes.buyIcon}></div>
                            <div className={classes.buyIcon}></div>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>
        // </div>
    )
}
