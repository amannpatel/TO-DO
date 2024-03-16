import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { profileImg } from "../utils/constants";

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // navigate back to homepage after logout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-100 mt-3 shadow-lg rounded-2xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl rounded-full">✍🏻 Todo App</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img alt="profile" src={user?.photoURL} />
              ) : (
                <img alt="profile" src={profileImg} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="btn btn-error text-white" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
