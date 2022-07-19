import { Card, Col, Container, Row } from "react-bootstrap";

export default function SummonerStats({ summonerData, profileIconAssets }) {
    // const championLoadingScreenAssets = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
    const summonerProfile = () => {
        return (
            <Card style={{ width: '10rem' }} className="mx-auto">
                <Card.Img variant="top" src={profileIconAssets + summonerData.summoner_info.profileIconId.toString() + '.png'}></Card.Img>
                <Card.Body><strong>{summonerData.summoner_info.name}</strong></Card.Body>
                <Card.Footer><strong>{summonerData.summoner_info.summonerLevel}</strong></Card.Footer>
            </Card>
        );
    };

    const summonerRank = () => {
        let emblem = summonerData.summoner_info.aram.closestRank;
        return (
            <Card style={{ width: '10rem' }} className="mx-auto">
                <Card.Img variant="top" src={require(`../img/Emblem_${emblem.match("[a-zA-Z]+")[0]}.png`)} />
                <Card.Body>{summonerData.summoner_info.aram.avg.toString() + " MMR"}</Card.Body>
            </Card>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    {summonerProfile()}
                </Col>

                <Col>
                    {summonerRank()}
                </Col>
            </Row>

        </Container>
    );
};