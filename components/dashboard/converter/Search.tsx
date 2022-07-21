import { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Form,
    FloatingLabel,
    Button,
    Stack
} from 'react-bootstrap';
import type { VideoInfo } from 'types'
import { Progress } from 'types';
import { findVideoMetadata } from 'data/actions/converter/findVideoMetadata';
import Spinner from '../../ui/Spinner';
import { isValidYoutubeUrl } from 'common/utils/isValidYoutubeUrl';

type SearchProps = {
    url: string;
    updateData: (newData: VideoInfo) => void;
    onDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({
    url,
    updateData,
    onDataChange
}: SearchProps): JSX.Element {
    const [urlSearchStatus, setUrlSearchStatus] = useState(Progress.IDLE);
    const [showingInvalidUrlMsg, setShowingInvalidUrlMsg] = useState(false);

    const [validated, setValidated] = useState(false);

    const parseTrackAndArtist = (title: string, channel: string) => {
        const regex = /^([\w\s]*)?(?:[\s]+[-][\s]+)([\w\s\(\)]*)/
        const result = regex.exec(title);
        console.log('Match: ', result)
        return {
            artist: result && result[1] || channel,
            track: result && result[2] || title
        }
    }

    const showUrlInvalid = () => {
        setShowingInvalidUrlMsg(true);
        setTimeout(() => {
            setShowingInvalidUrlMsg(false);
        }, 3000)
    }

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isValidYoutubeUrl(url)) {
                setValidated(true);
                setUrlSearchStatus(Progress.PENDING)
                const info = await findVideoMetadata(url);

                if (info) {
                    const { artist, track } = parseTrackAndArtist(info.title, info.channel);
                    updateData({
                        ...info,
                        artist: artist,
                        track: track
                    })
                }
            } else {
                e.stopPropagation();
                showUrlInvalid();
            }
        } catch (err) {
            e.stopPropagation();
            console.error(err);
        }
    }

    return (
        <>
            {
                urlSearchStatus === Progress.PENDING ? (
                    <Spinner />
                ) : (
                    <>
                        <Stack gap={3}>
                            <Container className="d-flex justify-content-center align-content-center">
                                <Form noValidate validated={validated} onSubmit={handleSearch}>
                                    <Form.Label htmlFor="youtubeUrl" className="mb-4 text-center">Paste the URL of a YouTube video below to generate an audio file.</Form.Label>
                                    <FloatingLabel
                                        controlId='youtubeUrl'
                                        label='YouTube URL'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='text'
                                            name='url'
                                            size="lg"
                                            placeholder='https://www.youtube.com/...'
                                            onChange={onDataChange}
                                        />
                                    </FloatingLabel>
                                    <div className="d-grid">
                                        <Button type="submit" variant="primary" size="lg">Search</Button>
                                    </div>
                                </Form>
                            </Container>
                            {
                                showingInvalidUrlMsg && (
                                    <div className='d-block text-center'>
                                        <span className="text-danger fs-3">Please enter a valid YouTube URL</span>
                                    </div>
                                )
                            }

                        </Stack>
                    </>
                )
            }
        </>
    )
}
