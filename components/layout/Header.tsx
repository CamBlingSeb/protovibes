import Container from 'react-bootstrap/Container';
import { CurrentUser } from 'server/lib/session';
import classes from './styles/Layout.module.scss';
import { logout } from '../../data/actions/auth/logout';
import useUser from 'data/fetchers/auth/useUser';

type HeaderProps = {
    user: CurrentUser;
}

export default function Header({ user }: HeaderProps): JSX.Element {
    const { mutateUser } = useUser({
        redirectTo: '/'
    })

    const handleLogout = () => {
        mutateUser(logout())
    }
    return (
        <header>
            <div className="px-3 py-3 bg-dark">
                <Container>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <h1 className={classes.logoText}>ProtoVibes</h1>
                        <div>
                            <span className='mx-3'>{user.accessCode}</span>
                            <svg onClick={() => handleLogout()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    )
}
