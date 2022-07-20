import Container from 'react-bootstrap/Container';
import classes from './styles/Layout.module.scss';

type FooterProps = {}

export default function Footer({ }: FooterProps): JSX.Element {
    return (
        <div className='mt-auto py-4 px-3 bg-dark'>
            <Container>
                <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
                    <div className='col-md-4 d-flex align-items-center'>
                        <a href="/" className='mb-3 me-2 mb-md-0 text-muted lh-1'>PV</a>
                        <span className='mb-3 mb-md-0 text-muted'>© 2022 ProtoVibes</span>
                    </div>
                </footer>
            </Container>
        </div>


    )
}
