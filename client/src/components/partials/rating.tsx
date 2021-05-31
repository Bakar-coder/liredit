import React, { FC } from "react";

interface ratingTypes {
  rating: number;
  numReviews?: number;
}

const Rating: FC<ratingTypes> = ({ rating, numReviews }) => {
  return (
    <div className="rating">
      <a href="#">
        <i
          className={
            rating >= 0.5 && rating < 1
              ? "ion-ios-star-half"
              : rating >= 1
              ? "ion-ios-star"
              : "ion-ios-star-outline"
          }
        />
      </a>
      <a href="#">
        <i
          className={
            rating >= 1.5 && rating < 2
              ? "ion-ios-star-half"
              : rating >= 2
              ? "ion-ios-star"
              : "ion-ios-star-outline"
          }
        />
      </a>
      <a href="#">
        <i
          className={
            rating >= 2.5 && rating < 3
              ? "ion-ios-star-half"
              : rating >= 3
              ? "ion-ios-star"
              : "ion-ios-star-outline"
          }
        />
      </a>
      <a href="#">
        <i
          className={
            rating >= 3.5 && rating < 4
              ? "ion-ios-star-half"
              : rating >= 4
              ? "ion-ios-star"
              : "ion-ios-star-outline"
          }
        />
      </a>
      <a href="#">
        <i
          className={
            rating >= 4.5 && rating < 5
              ? "ion-ios-star-half"
              : rating >= 5
              ? "ion-ios-star"
              : "ion-ios-star-outline"
          }
        />
      </a>
      {numReviews && (
        <span style={{ marginLeft: "16px" }}>{numReviews} Reviews</span>
      )}
    </div>
  );
};

export default Rating;
