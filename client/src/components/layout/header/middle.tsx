import { useRouter } from "next/router";
import React, { FC } from "react";
import Wrapper from "../../wrapper";

interface middleTypes {}

const HeaderMiddle: FC<middleTypes> = ({}) => {
  const router = useRouter();
  return (
    <div className="header__middle">
      <Wrapper>
        <section className="content">
          <div className="logo" onClick={() => router.push("/")}>
            <span>
              NexSh
              <i className="ion-android-cart" />P
            </span>
          </div>
          <div className="search">
            <input
              type="text"
              className="search__input"
              name="search"
              placeholder="Search item..."
            />
            <div className="search__icon">
              <i className="ion-ios-search" />
            </div>
          </div>
          <div className="cart__sec" onClick={() => router.push("/shop/cart")}>
            <i className="ion-android-cart" />

            <sup>100</sup>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default HeaderMiddle;
