

type HeaderProps = {}

export default function Header({ }: HeaderProps): JSX.Element {
    return (
        <header>
            <div className="px-3 py-2 bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <h1>ProtoVibes</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}
