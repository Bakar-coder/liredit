import React, { FC } from "react";
import Slider from "react-slick";
import Wrapper from "../wrapper";
import { settings } from "./settings";

interface indexTypes {}

const Carousel: FC<indexTypes> = ({}) => {
  const slideSetting = { ...settings, autoplay: true, arrows: false };
  return (
    <div className=" slider__section">
      <Slider {...slideSetting}>
        <div className="slider__item">
          <div
            className="single_slider"
            data-bgimg="/assets/images/sliders/slider2.jpg"
            style={{
              backgroundImage: "url('/assets/images/sliders/slider2.jpg')",
            }}
          >
            <Wrapper>
              <div className="slider_content">
                <h1>PLAYSTATION</h1>
                <h2>OVER 100 GAMES</h2>
                <p>
                  With gamers in mind, PlayStation delivers a new world of
                  unexpected gaming experiences through PlayStation VR.
                </p>
                <div className="cta">
                  <a className="button" href="#">
                    shopping now
                  </a>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>

        <div className="slider__item">
          <div
            className="single_slider"
            data-bgimg="/assets/images/sliders/slider7.jpg"
            style={{
              backgroundImage: "url('/assets/images/sliders/slider7.jpg')",
            }}
          >
            <Wrapper>
              <div className="slider_content">
                <h1>PLAYSTATION</h1>
                <h2>OVER 100 GAMES</h2>
                <p>
                  With gamers in mind, PlayStation delivers a new world of
                  unexpected gaming experiences through PlayStation VR.
                </p>

                <div className="cta">
                  <a className="button" href="#">
                    shopping now
                  </a>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
