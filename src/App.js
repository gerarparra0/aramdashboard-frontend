import axios from 'axios';
import { useState } from 'react';
import { Row, Container, Alert, Toast } from "react-bootstrap";

import './App.css';

import SearchBar from './components/SearchBar';
import SummonerMatchHistory from './components/SummonerMatchHistory';
import SummonerStats from './components/SummonerStats';
import useFetchAPIAssets from './hooks/assets/useFetchAPIAssets';

import useFetchSummonerData from './hooks/summoner/useFetchSummonerData';

export default function App() {
  axios.defaults.baseURL = 'http://localhost';

  const regions = ["NA", "KR", "EUW", "EUE"];

  const [summonerName, setSummonerName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("NA");

  const [errorShow, setErrorShow] = useState(false);

  const { version, championSquareAssets, itemSquareAssets, profileIconAssets } = useFetchAPIAssets();
  const { summonerData, summonerMatchData, summonerDataError } = useFetchSummonerData(summonerName, selectedRegion, isSubmitted);

  const errorMessage = msg => {
    setErrorShow(true);

    return (
      <Toast show={errorShow} onClose={() => setErrorShow(!errorShow)}>
        <Toast.Header><strong>Error</strong></Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    )
  }


  return (
    <>
      <SearchBar
        setIsSubmitted={setIsSubmitted}
        setSummonerName={setSummonerName}
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion} />

      <br></br>

      {/* {summonerDataError.length != 0 ? errorMessage(summonerDataError) : <></>} */}

      {summonerMatchData ?
        <Container>
          <Row>
            <SummonerStats
              summonerData={summonerData}
              summonerMatchData={summonerMatchData}
              profileIconAssets={profileIconAssets}
            />
          </Row>

          <Row>
            <SummonerMatchHistory
              summonerMatchData={summonerMatchData}
              summonerData={summonerData}
              championSquareAssets={championSquareAssets}
              itemSquareAssets={itemSquareAssets} />
          </Row>
        </Container>
        :
        <Container>
          <Row>
            <Alert variant='dark'>
              <Alert.Heading><strong>Type in you summoner name.</strong></Alert.Heading>
            </Alert>
          </Row>
        </Container>
      }
    </>
  );
}
