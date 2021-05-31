import React, { FC } from "react";
import Layout from "./layout";
import Carousel from "./slider/caraousel";
import Wrapper from "./wrapper";

interface indexTypes {}

const Home: FC<indexTypes> = ({}) => {
  return (
    <Layout>
      <div className="slider">
        <Carousel />

        <Wrapper>
          <div className="products__sec">
            <div className="category">Categories</div>
            <div className="grid">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>

              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                aliquid, est saepe vero explicabo tempora deleniti cum sit odit.
                Corrupti accusamus eius praesentium culpa nemo quos quaerat quo,
                velit sequi?
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default Home;
