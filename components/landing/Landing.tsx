import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import {
    Container,
    Form,
    Button,
    FloatingLabel
} from 'react-bootstrap';
import classes from './styles/Landing.module.scss'
import classnames from 'classnames/bind'
import { KeyedMutator } from 'swr';
import { CurrentUser } from '../../server/lib/session'
import { login } from '../../data/actions/auth/login';

type LandingProps = {
    mutateUser: KeyedMutator<CurrentUser>;
}

let cx = classnames.bind(classes)

export default function Landing({ mutateUser }: LandingProps): JSX.Element {
    const [loginRequestStatus, setLoginRequestStatus] = useState('idle');
    const [accessCode, setAccessCode] = useState({
        code: ''
    })

    const { code } = accessCode;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccessCode({ ...accessCode, [e.target.name]: e.target.value })
    }

    const [validated, setValidated] = useState(false);
    const canSubmit = () => {
        return code.length > 0 && loginRequestStatus === 'idle';
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (canSubmit()) {
                setValidated(true);
                setLoginRequestStatus('pending');
                mutateUser(login(code))
            } else {
                e.stopPropagation();
                setAccessCode({ code: '' })
            }
        } catch (err) {
            e.stopPropagation();
        }
    }

    return (
        <Container>
            <section className={cx('w-100 m-auto text-center', classes.accessCodeForm)}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-light">Enter Access Code</h1>
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
            </section>
        </Container>
    )
}
