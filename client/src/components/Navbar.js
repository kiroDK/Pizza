import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg px-4 shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          PizzaCrust
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item dropdown mt-2">
                <a
                  style={{ color: "black", textDecoration:"none" }}
                  className="dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  {currentUser.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/orders">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      <li>Logout</li>
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a style={{paddingLeft:"30px"}} className="nav-link" href="/cart">
                Cart {cartstate.cartItems.length}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
