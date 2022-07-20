type SpinnerProps = {}

export default function Spinner({ }: SpinnerProps): JSX.Element {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" style={{ width: '6rem', height: '6rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
