import styless from "./Headers.module.css";
import { Link } from "react-router-dom";

export default function Headers() {
  return (
    <header
      className={`d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom ${styless.head}`}
    >
      <div className="col-md-3 mb-2 mb-md-0">
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <svg
            className="bi"
            width="100%"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link
            to={"/cards"}
            className={`nav-link px-2 link-secondary ${styless.home}`}
          >
            Home
          </Link>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            Pricing
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            FAQs
          </a>
        </li>
        <li>
          <a href="#" className="nav-link px-2">
            About
          </a>
        </li>
      </ul>

      <div className="col-md-3 text-end">
        <Link to={"/login"}>
          <button type="button" className="btn btn-outline-primary me-2">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="btn btn-primary">
            Sign-up
          </button>
        </Link>
      </div>
    </header>
  );
}
