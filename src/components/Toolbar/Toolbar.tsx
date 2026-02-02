import {Link} from "react-router-dom";

const Toolbar = () => {
    return (
        <header
            className="d-flex justify-content-between align-items-center p-2 border-bottom mb-2"
            style={{ width: '100%' }}
        >
            <Link to="/" className="fs-4 fw-bold text-decoration-none">
                Contacts
            </Link>

            <Link to="/add" className="btn btn-primary m-0">
                Add new contact
            </Link>
        </header>
    );
};

export default Toolbar;