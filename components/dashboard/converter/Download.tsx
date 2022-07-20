import { useRef } from 'react';
import {
    Container,
    Button,
    InputGroup,
    Form
} from 'react-bootstrap';
import { AudioOutputFormat } from 'types';

type DownloadProps = {
    track: string | null;
    title: string;
    fileFormat: AudioOutputFormat;
    fileId: string;
    resetData: () => void;
}

export default function Download({
    track,
    title,
    fileFormat,
    fileId,
    resetData
}: DownloadProps): JSX.Element {

    const downloadRef = useRef<HTMLAnchorElement | null>(null);

    const handleDownload = () => {
        if (downloadRef.current) {
            downloadRef.current.click();
        } else {
            resetData()
        }
    }
    return (
        <Container className="text-center">
            <h3 className="mb-5">{`${fileFormat.toUpperCase()} Successfully Generated`}</h3>
            <a
                href={`/api/converter/download/${fileId}/${fileFormat}/${track || title}`}
                download
                ref={downloadRef}
                style={{ display: 'none' }}
            >Download</a>
            <InputGroup className="mb-5">
                <Form.Control type='text' value={`${track || title}.${fileFormat}`} size="sm" readOnly className="fs-4 py-3 px-3" />
                <Button variant='primary' size='lg' onClick={() => handleDownload()}>Download</Button>
            </InputGroup>




            <Button variant="outline-primary" size="lg" onClick={() => resetData()}>Convert Another</Button>
        </Container>
    )
}
