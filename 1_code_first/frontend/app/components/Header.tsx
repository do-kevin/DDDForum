import logo from "assets/dddforumlogo.png";
import { Link, useLocation } from "react-router";

const Logo = () => {
  return (
    <div id="app-logo">
      <img src={logo} alt="DDD Forum" />
    </div>
  );
};

const TitleAndSubmission = () => {
  return (
    <div id="title-container">
      <h1>Domain-Driven Designers</h1>
      <h3>Where awesome domain driven designers are made</h3>
      <Link to={"/submit"}>submit</Link>
    </div>
  );
};

const HeaderActionButton = ({ user }: { user: any }) => {
  return (
    <div id="header-action-button">
      {user ? (
        <div>
          {user.username}
          <u>
            <div>logout</div>
          </u>
        </div>
      ) : (
        <Link to="/join">join</Link>
      )}
    </div>
  );
};

const shouldShowActionButton = (pathName: string) => {
  return pathName !== "/join";
};

export default function Header({ pathName }: { pathName: string }) {
  const location = useLocation();

  return (
    <header
      id="header"
      className="flex items-center justify-between"
      style={{ border: "3px solid magenta" }}
    >
      <Logo />
      <TitleAndSubmission />
      {shouldShowActionButton(location.pathname) ? (
        <HeaderActionButton user={{ username: "@john" }} />
      ) : (
        ""
      )}
    </header>
  );
}
