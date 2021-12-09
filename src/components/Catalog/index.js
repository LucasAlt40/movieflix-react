/* eslint-disable */
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Spacer,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import fetchData from "../../functions/fetchData";

export default function Catalog() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "0b001cf6e81fdfed426c49bcb1a2de2e";
  const baseUrlImg = "https://image.tmdb.org/t/p/w300";

  async function fetchApi() {
    const response = await fetchData(
      `/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=1`
    );
    setFilme(response.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Flex
        wrap={"wrap"}
        margin={"4rem auto"}
        width={"90rem"}
        align={"center"}
        justifyContent={"center"}
      >
        {filme.map((film) => (
          <div
            style={{ width: "300px", margin: "1rem", height: "450px" }}
            key={film.id}
          >
            <CircularProgress
              value={film.vote_average}
              min={0}
              max={10}
              className="nota"
              style={{
                position: "absolute",
                marginLeft: "15.7rem",
                marginTop: "25rem",
              }}
              color="green.400"
            >
              <CircularProgressLabel
                color={"green.400"}
              >
                <strong>{film.vote_average}</strong>
              </CircularProgressLabel>
            </CircularProgress>
            <img
              style={{ objectFit: "cover" }}
              src={baseUrlImg + film.poster_path}
              alt="poster img"
            />
          </div>
        ))}
      </Flex>
    </>
  );
}