import React, { FC } from "react";
import Wrapper from "../../wrapper";

interface topTypes {}

const HeaderTop: FC<topTypes> = ({}) => {
  return (
    <div className="header__top">
      <Wrapper>
        <div className="row header__top__content">
          <div className="col-md-4 col-lg-4">
            <div className="welcome-text">
              <p>
                Welcome to <span className="home2-color">NexShop</span> Store
              </p>
            </div>
          </div>
          <div className="col-md-8 col-lg-8">
            <ul>
              <li>
                <i className="ion-ios-checkmark-outline" /> checkout
              </li>
              <li>
                <i className="ion-ios-checkmark-outline" /> wishlist
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HeaderTop;
