import { useState, FormEvent, ChangeEvent } from 'react'
import {
    Container,
    Form,
    Button,
    FloatingLabel
} from 'react-bootstrap';
import classes from './styles/Landing.module.scss'
import classnames from 'classnames/bind'
import { login } from 'data/actions/auth/login';
import useUser from 'data/fetchers/auth/useUser';
import Spinner from '../ui/Spinner';
import { Progress } from 'types';

type LandingProps = {

}

let cx = classnames.bind(classes)

export default function Landing({ }: LandingProps): JSX.Element {
    const { mutateUser } = useUser({
        redirectTo: '/dash',
        redirectIfFound: true
    });

    const [loginRequestStatus, setLoginRequestStatus] = useState(Progress.IDLE);
    const [accessCode, setAccessCode] = useState({
        code: ''
    })

    const { code } = accessCode;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccessCode({ ...accessCode, [e.target.name]: e.target.value })
    }

    const [validated, setValidated] = useState(false);
    const canSubmit = () => {
        return code.length > 0 && loginRequestStatus === Progress.IDLE;
    }

    const handleLoginError = () => {
        setValidated(false);
        setAccessCode({ code: '' })
        setLoginRequestStatus(Progress.IDLE);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (canSubmit()) {
                setValidated(true);
                setLoginRequestStatus(Progress.PENDING);
                mutateUser(login(code, handleLoginError), {
                    populateCache: false,
                    revalidate: true
                })
            } else {
                setAccessCode({ code: '' })
            }
        } catch (err) {
            setLoginRequestStatus(Progress.FAILED);
            setAccessCode({ code: '' })
        }
    }

    return (
        <Container className={cx("d-flex", classes.landing)}>
            <section className={cx('w-100 m-auto text-center', classes.accessCodeForm)}>
                <h1 className={classes.logoText}>ProtoVibes</h1>
                {
                    loginRequestStatus === Progress.PENDING ? (
                        <Spinner />
                    ) : (
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <h2 className="h3 mb-3 fw-normal text-secondary fst-italic">Enter Access Code</h2>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Access Code"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    name="code"
                                    placeholder="Access Code"
                                    onChange={onChange}
                                />
                            </FloatingLabel>
                            <div className="d-grid">
                                <Button type="submit" variant="primary" size="lg">Submit</Button>
                            </div>
                        </Form>
                    )
                }

            </section>
        </Container>
    )
}
