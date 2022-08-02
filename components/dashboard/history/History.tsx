import { useEffect } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import classes from './styles/History.module.scss';
import HistoryItem from './HistoryItem';
import Spinner from '../../ui/Spinner';
import useHistory from 'data/fetchers/history/useHistory';
import { CurrentUser } from 'server/lib/session';

type HistoryProps = {
    user?: CurrentUser;
    showing: boolean;
    handleClose: () => void;
}

export default function History({
    user,
    showing = false,
    handleClose,
    ...props
}: HistoryProps): JSX.Element {

    const { history, loading, mutateHistory } = useHistory(user);

    useEffect(() => {
        if (history) {
            console.log('History Updated: ', history);
        }
    }, [history])

    return (
        <>
            <Offcanvas show={showing} onHide={handleClose} placement='end' {...props}>
                <Offcanvas.Header closeButton closeVariant='white' >
                    <Offcanvas.Title className='fs-3 px-3 py-1 text-secondary'>History</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        loading ? (
                            <Spinner />
                        ) : (
                            <Stack gap={3}>
                                {history && history.length && history.map((item, index) => (
                                    <HistoryItem
                                        key={index}
                                        track={item.track}
                                        artist={item.artist}
                                        url={item.url}
                                        thumb={item.thumb}
                                        format={item.format}
                                    />
                                )) || <span>No History Yet</span>}
                            </Stack>
                        )
                    }

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
