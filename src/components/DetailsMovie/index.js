import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { axiosGet } from "../../utils";

import FavoriteButton from "../FavoriteButton";

import "./styles.scss";
import { ArrowBack } from "@mui/icons-material";
import { Skeleton } from "@mui/material";

export default function DetailsMovie() {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  const convertTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const textHours = `00${hours}`.slice(-2);
    const textMinutes = `00${min}`.slice(-2);

    return `${textHours}h${textMinutes}`;
  };

  const fetchApi = async () => {
    const url = `http://localhost:8080/movie-details`;

    const options = {
      method: "GET",
      url: url,
      params: { page: 1, movieId: id },
    };

    await axiosGet(options)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchApi();
  }, []); // eslint-disable-line

  return (
    <>
      {!loading ? (
        <div className="details-container">
          <img
            className="bg-image"
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt="poster"
          />
          <div className="details-content">
            <div className="extra-contents">
              <Link to="/">
                <ArrowBack /> Back to Home
              </Link>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="poster-movie"
              />
              <p>
                Runtime: <span>{convertTime(movie?.runtime)}</span>
              </p>
            </div>
            <div className="details-texts">
              <h1 style={{ color: "#FFF" }}>{movie?.title}</h1>
              <div className="genres">
                {movie.genres.map((genre) => (
                  <div key={genre.id} className="genre">
                    <h4>{genre.name}</h4>
                  </div>
                ))}
              </div>
              <section className="overview-movie" style={{ color: "#FFF" }}>
                <h3>Overview</h3>
                <p>{movie?.overview}</p>
                <div className="favorite-movie">
                  <FavoriteButton /> Add movie to yours favorite
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton variant="rect" width={210} height={118} />
      )}
    </>
  );
}
