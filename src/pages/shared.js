import { Outlet, Link, useHref, useLocation } from "react-router-dom";

const SharedLayout = () => {
  const location = useLocation();
  let pageDefinition;
  if (location.pathname === "/") {
    pageDefinition = "Home";
  }
  if (
    location.pathname.includes("units") &&
    location.pathname[location.pathname.length - 1] === "s"
  ) {
    pageDefinition = "Units";
  }
  if (location.pathname.split("").some((item) => !isNaN(Number(item)))) {
    pageDefinition = "Details";
  }
  return (
    <main>
      <header>
        <h2
          className="page-title"
          data-testid="title"
        >{`${pageDefinition} Page`}</h2>
        <div className="nav-links">
          <Link to="/" className="btn nav-btn">
            Home
          </Link>
          <Link to="/units" className="btn nav-btn">
            Units
          </Link>
        </div>
      </header>
      <Outlet></Outlet>
    </main>
  );
};

export default SharedLayout;
