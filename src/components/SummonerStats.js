import { Card, Col, Container, Figure, Image, Row } from "react-bootstrap";

export default function SummonerStats({ summonerData, summonerMatchData, profileIconAssets }) {
    // const championLoadingScreenAssets = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
    const summonerProfile = () => {
        return (
            <Card style={{ width: '9rem' }} className="mx-auto my-2">
                <Card.Img variant="top" src={profileIconAssets + summonerData.summoner_info.profileIconId.toString() + '.png'}></Card.Img>
                <Card.Body>{summonerData.summoner_info.name + " "}<strong>{summonerData.summoner_info.summonerLevel}</strong></Card.Body>
            </Card>
        );
    };

    // const summonerRecentStats = () => {
    //     // find the winrate, 
    //     return (
    //         <Card>

    //         </Card>
    //     )
    // };

    const summonerRank = () => {
        let emblem = summonerData.summoner_info.aram.closestRank;
        return (
            <Card style={{ width: '9rem' }} className="mx-auto my-2">
                <Card.Img variant="top" src={require(`../img/Emblem_${emblem.match("[a-zA-Z]+")[0]}.png`)} />
                <Card.Body>{summonerData.summoner_info.aram.avg.toString() + " MMR"}</Card.Body>
            </Card>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    {summonerProfile()}
                </Col>

                <Col>

                </Col>

                <Col>
                    {summonerRank()}
                </Col>
            </Row>

        </Container>
    );
};