import React, { useState, useEffect, useRef } from "react";
import { axiosGet } from "../../utils";
import { isEmpty } from "lodash";

import "./style.scss";
import { Skeleton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Poster from "../Poster";

export default function Carousel(props) {
  const { movieUrlApi, movieCategory, typeMedia } = props;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const carousel = useRef(null);

  const fetchApi = async () => {
    setLoading(true);
    const url = `http://localhost:8080/${movieUrlApi}`;

    const options = {
      method: "GET",
      url: url,
      params: { page: 1, typeMedia: typeMedia },
    };

    await axiosGet(options)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchApi();
  }, [typeMedia]); // eslint-disable-line

  const handleLeftCLick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= 1000;
  };

  const handleRightCLick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += 1000;
  };

  return (
    <div className="container">
      <div className="header-carousel">
        <h1 style={{ color: "white", margin: "1rem" }}>{movieCategory}</h1>

        <div className="buttons">
          <button onClick={handleLeftCLick}>
            <ArrowBack />{" "}
          </button>
          <button onClick={handleRightCLick}>
            <ArrowForward />
          </button>
        </div>
      </div>
      <div className="carousel" ref={carousel}>
        {!loading && !isEmpty(movies) ? (
          movies.map((movie) => <Poster typeMedia={typeMedia} key={movie.id} movie={movie} />)
        ) : (
          <Skeleton variant="rect" width={"100%"} height={"60%"} />
        )}
      </div>
    </div>
  );
}
