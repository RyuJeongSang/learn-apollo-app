import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const LoadingContainer = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  height: 150vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const OutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 25%;
  height: 500px;
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  margin: 50px 0;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <>
      {loading ? (
        <LoadingContainer>
          <Title>Loading...</Title>
        </LoadingContainer>
      ) : (
        <Container>
          <OutContainer>
            <Main>
              <Column>
                <Title>{data.movie.title}</Title>
                <Subtitle>
                  {data.movie.language} · {data.movie.rating}
                </Subtitle>
                <Description>{data.movie.description_intro}</Description>
              </Column>
              <Poster bg={data.movie.medium_cover_image} />
            </Main>
            <Movies>
              {data.suggestions.map((m) => (
                <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
              ))}
            </Movies>
          </OutContainer>
        </Container>
      )}
    </>
  );
};

export default Detail;
