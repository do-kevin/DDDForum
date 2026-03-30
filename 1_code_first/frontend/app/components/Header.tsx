import logo from "assets/dddforumlogo.png";
import { useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useUser } from "~/contexts/usersContext";

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
      <h1 className="text-2xl/7 font-bold">Domain-Driven Designers</h1>
      <h3 className="font-bold">
        Where awesome domain driven designers are made
      </h3>
      <Link to={"/submit"} className="underline text-blue-700">
        submit
      </Link>
    </div>
  );
};

const HeaderActionButton = ({ user }: { user: any }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const handleLoginButton = (event: MouseEvent<HTMLButtonElement>) => {
    if (!user.username) {
      navigate("/register");
      return null;
    }

    event?.preventDefault();
    event?.stopPropagation();
    setUser(null);
  };

  return (
    <div id="header-action-button">
      {user ? (
        <div>
          {user.username}
          {user.username && <br />}
          <button
            className="btn btn-neutral rounded-none"
            onClick={handleLoginButton}
          >
            {user.username ? "Logout" : "Join"}
          </button>
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
  const { user } = useUser();

  useEffect(() => {}, [user]);

  return (
    <header id="header" className="flex items-center justify-between">
      <div className="flex items-center  ml-4 mr-auto justify-between gap-4">
        <Logo />
        <TitleAndSubmission />
        {shouldShowActionButton(location.pathname) ? (
          <HeaderActionButton user={{ username: user?.username }} />
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
