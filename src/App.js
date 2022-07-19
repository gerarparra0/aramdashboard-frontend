import axios from 'axios';
import { useState } from 'react';
import { Row, Container, Card } from "react-bootstrap";

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

  const { version, championSquareAssets, itemSquareAssets, profileIconAssets } = useFetchAPIAssets();
  const { summonerData, summonerMatchData } = useFetchSummonerData(summonerName, selectedRegion, isSubmitted);

  return (
    <>
      <SearchBar
        setIsSubmitted={setIsSubmitted}
        setSummonerName={setSummonerName}
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion} />

      <br></br>

      <Container>
        <Row>
          {summonerData ?
            <SummonerStats
              summonerData={summonerData}
              profileIconAssets={profileIconAssets}
            />
            :
            <Card>
              <Card.Body><strong>Enter summoner name...</strong></Card.Body>
            </Card>
          }
        </Row>

        <br></br>

        <Row>
          {summonerMatchData ?
            <SummonerMatchHistory
              summonerMatchData={summonerMatchData}
              summonerData={summonerData}
              championSquareAssets={championSquareAssets}
              itemSquareAssets={itemSquareAssets} />
            :
            <Card>
              <Card.Body><strong>Enter summoner name...</strong></Card.Body>
            </Card>
          }
        </Row>
      </Container>
    </>
  );
}
