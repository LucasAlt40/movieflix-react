import React, { useState } from "react";

import { Button } from "@mui/material";

import "./style.scss";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";
import { SearchRounded } from "@mui/icons-material";
import ModalSearch from "../ModalSearch";

export default function CatalogComponent({typeMedia = "movies"}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <main className="catalog-container">
      <div>
      <div className="filtro">
        <ul>
          <li>
            <Link to={"/tv"}>
              <Button variant={typeMedia === "tv" ? "contained" : "outlined"}>TV Series</Button>
            </Link>
          </li>
          <li>
            <Link to={"/movies"}>
              <Button variant={typeMedia === "tv" ? "outlined" : "contained"}>Movies</Button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="searchBox">
        <button onClick={handleOpen}>
          <SearchRounded /> Search
        </button>
      </div>
      </div>
      <div className="carousels-container">
        <Carousel movieUrlApi="movies-popular" typeMedia={typeMedia} movieCategory={typeMedia === "movies" ? "Popular Movies" : "Popular Tv Shows"} />
        <Carousel movieUrlApi="movies-now-playing" typeMedia={typeMedia} movieCategory={typeMedia === "movies" ? "Movies now playing" : "Tv Shows airing today"} />
        {typeMedia === "movies" ? (<Carousel movieUrlApi="movies-upcoming" typeMedia={typeMedia} movieCategory="Movies upcoming" />) : null}
        <Carousel movieUrlApi="movies-top-rated" typeMedia={typeMedia} movieCategory={typeMedia === "movies" ? "Top rated Movies" : "Top rated Tv Shows"} />
      </div>
      <ModalSearch 
        open={open}
        setOpen={setOpen}
        typeMedia={typeMedia}
      />
    </main>
  );
}
