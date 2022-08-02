import classes from './styles/History.module.scss'
import classnames from 'classnames/bind';
import {
    Container,
    Row,
    Col,
    Placeholder,
    Stack,
    Image
} from 'react-bootstrap'

type HistoryItemProps = {
    track: string;
    artist: string;
    url: string;
    thumb: string;
    format: string;
}

let cx = classnames.bind(classes);

export default function HistoryItem({
    track,
    artist,
    url,
    thumb,
    format
}: HistoryItemProps): JSX.Element {
    return (
        // <div >
        <Container className={classes.historyItemOuter}>
            <Row className='' md={12}>
                <Col md={3} className={classes.thumbnailOuter}>
                    <div className={classes.thumbnailContainer}>
                        <Image alt={track} src={thumb} fluid className={cx("mx-auto d-block opacity-75", classes.thumbnail)} />
                        <button className={classes.originalLink}>
                            <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-btn-fill" viewBox="0 0 16 16">
                                    <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                </svg>
                            </a>
                        </button>
                    </div>
                </Col>
                <Col md={8} className={cx('py-2', classes.historyItemInfo)}>
                    <div>
                        <h3 className='align-text-bottom'>{track}</h3>
                        <small>{artist}</small>
                    </div>
                    <div>
                        <Stack direction="horizontal" gap={4}>
                            {/* <div className={classes.buyIcon}>

                            </div>
                            <div className={classes.buyIcon}></div>
                            <div className={classes.buyIcon}></div> */}
                        </Stack>
                    </div>
                </Col>
                <Col md={1} className={cx('py-2 d-flex flex-column justify-content-between', classes.historyItemActions)}>
                    <div className={classes.infoButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg>
                    </div>
                    <div className={classes.reconvertButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </div>
                </Col>
            </Row>
        </Container>
        // </div>
    )
}
