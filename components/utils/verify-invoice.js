import BreadCrumb from "./BreadCumb";

const VerifyInvoice = ( ) => (
    <div className={`pluto-top-padding vh-100 w-100 position-relative`}>
        <BreadCrumb title={''} />

        <div className="col-md-3 card signup-card position-absolute top-50 start-50 translate-middle">
            <form className="text-center p-5" >
                { form }
                <button className="btn btn-lg btn-primary btn-block my-4 w-100" type="submit">Submit</button>
            </form>

        </div>
    </div>
)