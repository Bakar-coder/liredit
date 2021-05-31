import React, { FC, useContext } from "react";
import Link from "next/link";
import { useLogoutMutation } from "../../../generated/graphql";
import { baseContext } from "../../../context/base/context";
import { Avatar, useToast } from "@chakra-ui/core";
import Wrapper from "../../wrapper";

interface navTypes {}

const Nav: FC<navTypes> = ({}) => {
  const [, logout] = useLogoutMutation();
  const { user, setUser } = useContext(baseContext);
  const toast = useToast();

  return (
    <nav className="navbar">
      <Wrapper>
        <div className="content">
          <div className="logo"></div>
          <ul className="list">
            <li className="list__item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="list__item">
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </li>
            <li className="list__item">
              <Link href="/shop/cart">
                <a>Cart</a>
              </Link>
            </li>

            <li className="list__item">
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>

            {!user && (
              <li className="list__item">
                <Link href="/auth/register">
                  <a>Signup</a>
                </Link>
              </li>
            )}
            {!user && (
              <li className="list__item">
                <Link href="/auth/login">
                  <a className="button button__small">
                    <i className="ion-log-in" /> Signin
                  </a>
                </Link>
              </li>
            )}

            {(user?.admin || user?.seller) && (
              <li className="list__item">
                <Link href="/auth/login">
                  <a>
                    <i className="ion-gear-a" /> Dashboard
                  </a>
                </Link>
              </li>
            )}

            {user && (
              <li className="list__item">
                <Link href="/auth/login">
                  <a className="userAvatar">
                    <Avatar /> {user.firstName}
                  </a>
                </Link>
              </li>
            )}
            {user && (
              <li
                className="list__item"
                onClick={async () => {
                  const { data } = await logout();
                  if (data?.logout) {
                    setUser(null);
                    toast({
                      title: "LOGOUT MESSAGE",
                      description: `Good bye!  logout successful.`,
                      status: "success",
                      position: "bottom-right",
                    });
                  }
                }}
              >
                <Link href="#">
                  <a className="button button__small">
                    <i className="ion-log-out" /> logout
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Nav;
