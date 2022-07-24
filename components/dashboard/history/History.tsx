import { Offcanvas, Stack } from 'react-bootstrap';
import classes from './styles/History.module.scss';
import HistoryItem from './HistoryItem';

type HistoryProps = {
    showing: boolean;
    handleClose: () => void;
}

export default function History({
    showing = false,
    handleClose,
    ...props
}: HistoryProps): JSX.Element {

    return (
        <>
            <Offcanvas show={showing} onHide={handleClose} placement='end' {...props}>
                <Offcanvas.Header closeButton closeVariant='white' >
                    <Offcanvas.Title className='fs-3 px-3 py-1 text-secondary'>History</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={3}>
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
