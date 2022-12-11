
const Loading = () => (
    <div className="overlay d-flex justify-content-center align-items-center border-1 btn-danger" style={{zIndex: 200}}>
        <div className="lds-ring pluto-top-padding">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export default Loading;