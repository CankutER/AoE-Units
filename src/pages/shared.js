import { Outlet, Link } from "react-router-dom";

const SharedLayout = () => {
  return (
    <main>
      <header>
        <h1 className="page-title">PAGE TITLE</h1>
        <div className="nav-links">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/units" className="nav-btn">
            Units
          </Link>
        </div>
      </header>
      <Outlet></Outlet>
    </main>
  );
};

export default SharedLayout;
