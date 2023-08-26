import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { Box } from "@mui/material";

class Ratings extends Component {
  state = {
    ratingUsability: 0,
    ratingMarket: 0,
    ratingPresentation: 0,
    ratingInnovation: 0,
  };

  changeRatingUsability = async (newRating, name) => {
    await this.setState({
      ratingUsability: newRating,
    });
    this.props.dataFromRatings(
      this.state.ratingUsability,
      this.state.ratingMarket,
      this.state.ratingPresentation,
      this.state.ratingInnovation
    );
  };
  changeRatingMarket = async (newRating, name) => {
    await this.setState({
      ratingMarket: newRating,
    });
    this.props.dataFromRatings(
      this.state.ratingUsability,
      this.state.ratingMarket,
      this.state.ratingPresentation,
      this.state.ratingInnovation
    );
  };
  changeRatingPresentation = async (newRating, name) => {
    await this.setState({
      ratingPresentation: newRating,
    });
    this.props.dataFromRatings(
      this.state.ratingUsability,
      this.state.ratingMarket,
      this.state.ratingPresentation,
      this.state.ratingInnovation
    );
  };
  changeRatingInnovation = async (newRating, name) => {
    await this.setState({
      ratingInnovation: newRating,
    });
    await this.props.dataFromRatings(
      this.state.ratingUsability,
      this.state.ratingMarket,
      this.state.ratingPresentation,
      this.state.ratingInnovation
    );
  };

  render() {
    return (
      <Box>
        <h2>Ratings</h2>
        <Box mb={2}>
          <h4>Usability</h4>
          <StarRatings
            rating={this.state.ratingUsability}
            starRatedColor="#E4D00A"
            changeRating={this.changeRatingUsability}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="15px"
            starHoverColor=""
          />
        </Box>
        <Box mb={2}>
          <h4>Market Potential</h4>
          <StarRatings
            rating={this.state.ratingMarket}
            starRatedColor="#E4D00A"
            changeRating={this.changeRatingMarket}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="15px"
            starHoverColor=""
          />
        </Box>
        <Box mb={2}>
          <h4>Presentation</h4>
          <StarRatings
            rating={this.state.ratingPresentation}
            starRatedColor="#E4D00A"
            changeRating={this.changeRatingPresentation}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="15px"
            starHoverColor=""
          />
        </Box>
        <Box mb={2}>
          <h4>Innovation</h4>
          <StarRatings
            rating={this.state.ratingInnovation}
            starRatedColor="#E4D00A"
            changeRating={this.changeRatingInnovation}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
            starSpacing="15px"
            starHoverColor=""
          />
        </Box>
      </Box>
    );
  }
}

export default Ratings;
