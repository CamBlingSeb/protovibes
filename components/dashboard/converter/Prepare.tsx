import { ChangeEvent, FormEvent } from 'react';
import classes from './styles/Prepare.module.scss';
import classnames from 'classnames/bind';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    InputGroup,
    FloatingLabel,
    Dropdown,
    DropdownButton,
    Accordion
} from 'react-bootstrap';
import type { VideoInfo } from 'types';
import { Progress, AudioOutputFormat } from 'types';
import { convertVideoToAudio } from 'data/actions/converter/convertVideoToAudio';
import Spinner from '../../ui/Spinner'

let cx = classnames.bind(classes);

type PrepareProps = {
    data: VideoInfo;
    conversionStatus: Progress;
    updateStatus: (status: Progress) => void;
    updateData: (newData: VideoInfo) => void;
    onFormatChange: (format: AudioOutputFormat) => void;
    onDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
    resetData: () => void;
}

export default function Prepare({
    data,
    conversionStatus,
    updateStatus,
    updateData,
    onFormatChange,
    onDataChange,
    resetData
}: PrepareProps): JSX.Element {
    const { url, fileId, title, thumb, duration, fileFormat, averageBitrate, averageSampleRate, track, artist, album, releaseYear } = data;

    const videoDataExists = () => {
        return url && title && url.length && title.length;
    }

    const handleConvert = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (videoDataExists()) {
                updateStatus(Progress.PENDING);
                const metadata = await convertVideoToAudio({
                    url: url,
                    title: title,
                    fileId: fileId,
                    fileFormat: fileFormat || AudioOutputFormat.MP3
                })

                if (metadata && metadata.success) {
                    updateStatus(Progress.COMPLETE);
                    updateData({ fileName: metadata.fileName })
                } else {
                    console.log('Conversion Failed');
                    updateStatus(Progress.FAILED);
                }
            } else {
                e.stopPropagation();
                updateStatus(Progress.FAILED);
                console.log('Insufficient Video Data');
            }

        } catch (err) {
            e.stopPropagation();
            console.error(err);
        }
    }

    const swapNameWithArtist = () => {
        if (artist && artist.length && track && track.length) {
            updateData({
                track: artist,
                artist: track
            })
        }
    }

    return (
        <Container>
            <Row>
                <Container className="mb-5">
                    {
                        conversionStatus === Progress.PENDING ? (
                            <Spinner />
                        ) : (
                            <Form onSubmit={handleConvert}>
                                <InputGroup className="w-100">
                                    <DropdownButton
                                        variant="outline-primary"
                                        title={fileFormat && fileFormat.toUpperCase() || AudioOutputFormat.MP3.toUpperCase()}
                                        id="fileFormat"
                                    // size="lg"
                                    >
                                        <Dropdown.Item
                                            eventKey="1"
                                            onClick={() => onFormatChange(AudioOutputFormat.MP3)}
                                            active={fileFormat === AudioOutputFormat.MP3}
                                        >MP3</Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey="2"
                                            onClick={() => onFormatChange(AudioOutputFormat.FLAC)}
                                            active={fileFormat === AudioOutputFormat.FLAC}
                                        >FLAC</Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey="3"
                                            onClick={() => onFormatChange(AudioOutputFormat.WAV)}
                                            active={fileFormat === AudioOutputFormat.WAV}
                                        >WAV</Dropdown.Item>
                                    </DropdownButton>
                                    <FloatingLabel
                                        controlId="trackName"
                                        label="Track Name"
                                        className="fs-5 text-uppercase"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="track"
                                            value={track}
                                            onChange={onDataChange}
                                            className={cx("flex-grow-1 fs-4", classes.conversionInput)}
                                            style={{ height: '5.5rem' }}
                                        />
                                    </FloatingLabel>
                                    <Button
                                        className="px-4"
                                        onClick={() => swapNameWithArtist()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                                        </svg>
                                    </Button>
                                    <FloatingLabel
                                        controlId="artistName"
                                        label="Artist"
                                        className="fs-5 text-uppercase"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="artist"
                                            value={artist}
                                            onChange={onDataChange}
                                            className={cx("flex-grow-1 fs-4", classes.conversionInput)}
                                            style={{ height: '5.5rem' }}
                                        />
                                    </FloatingLabel>
                                    <Button type="submit" size="lg" className="flex-fill px-5">Convert</Button>
                                </InputGroup>
                            </Form>
                        )
                    }

                </Container>
            </Row>
            <Row>
                <Accordion defaultActiveKey="0" className="mb-5">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Container fluid>
                                <h3>Track</h3>
                            </Container>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col xs={12} sm={12} md={4}>
                                    <div className={cx("text-center", classes.thumbnailContainer)}>
                                        <Image alt={title} src={thumb} fluid className={cx("mx-auto d-block", classes.videoThumbnail)} />
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={8}>
                                    <Row className={classes.trackInfoHeader}>
                                        <div >
                                            <h3>{title}</h3>
                                        </div>
                                    </Row>
                                    <Row className={classes.trackInfoBody}>
                                        <Col>
                                            <span>{`Track: ${track || ''}`}</span>
                                            <span>{`Artist: ${artist || ''}`}</span>
                                            <span>{`Duration: ${duration}`}</span>
                                        </Col>
                                        <Col>
                                            <span>{`Bitrate: ${averageBitrate && +averageBitrate?.toFixed(2) || 0} kBit/s`}</span>
                                            <span>{`Sample Rate: ${averageSampleRate && Math.round(averageSampleRate / 1000) || 0} kHz`}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
            <Row>
                <InputGroup className='mb-5'>
                    <Form.Control type='text' value={url} size="sm" readOnly />
                    <Button variant="outline-primary" onClick={() => resetData()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </Button>
                </InputGroup>
            </Row>
        </Container>
    )
}
