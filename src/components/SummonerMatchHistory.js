import { Badge, Card, Col, Container, Figure, ProgressBar, Row } from "react-bootstrap";

export default function SummonerMatchHistory({ summonerMatchData, summonerData, championSquareAssets, itemSquareAssets }) {

    const participantCard = (match) => {
        let participant = match.data.match_info.info.participants.find(p => p.puuid == summonerData.summoner_info.puuid);

        if (participant == undefined)
            participant = match.data.match_info.info.participants[0];

        let teamPhysicalDamageToChampions = 0;
        let teamMagicDamageToChampions = 0;
        let teamTrueDamageDealtToChampions = 0;

        // find the total team damage
        match.data.match_info.info.participants.forEach(part => {
            if (part.teamId == participant.teamId) {
                teamPhysicalDamageToChampions += part.physicalDamageDealtToChampions;
                teamMagicDamageToChampions += part.magicDamageDealtToChampions;
                teamTrueDamageDealtToChampions += part.trueDamageDealtToChampions;
            }
        });

        const teamTotalDamage = teamPhysicalDamageToChampions + teamMagicDamageToChampions + teamTrueDamageDealtToChampions;

        const physicalDamageRatio = (participant.physicalDamageDealtToChampions / teamTotalDamage) * 100;
        const magicDamageRatio = (participant.magicDamageDealtToChampions / teamTotalDamage) * 100;
        const trueDamageRatio = (participant.trueDamageDealtToChampions / teamTotalDamage) * 100;

        let items = []

        items.push(participant.item0);
        items.push(participant.item1);
        items.push(participant.item2);
        items.push(participant.item3);
        items.push(participant.item4);
        items.push(participant.item5);
        items.push(participant.item6);

        return (
            <Card
                border={participant.win ? "primary" : "danger"}
                className="mb-3">
                <Card.Body>
                    <Container>
                        <Row>
                            {/* Champion image */}
                            <Col>
                                <Figure className="mx-auto">
                                    <Figure.Image
                                        rounded
                                        width={80}
                                        height={80}
                                        src={championSquareAssets + participant.championName + ".png"}>
                                    </Figure.Image>
                                    <Figure.Caption>
                                        <Badge
                                            bg={participant.kills > participant.deaths ? "success" : "danger"}>
                                            <strong>{participant.kills + " / " + participant.deaths + " / " + participant.assists}</strong>
                                        </Badge>
                                    </Figure.Caption>
                                </Figure>
                            </Col>

                            {/* KDA and items*/}
                            <Col>
                                <Row>
                                    {items.map((i, idx) => (
                                        <Col key={idx}>
                                            <Figure>
                                                <Figure.Image
                                                    width={64}
                                                    height={64}
                                                    src={i > 0 ? itemSquareAssets + i + ".png" : require("../img/0.png")}>
                                                </Figure.Image>
                                            </Figure>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>

                            {/* Damage info */}
                            <Col>
                                <Container>
                                    <ProgressBar aria-label="Damage dealt to champions" label="Damage dealt to champions">
                                        <ProgressBar
                                            now={physicalDamageRatio}
                                            variant="danger"
                                            key={1}>
                                        </ProgressBar>
                                        <ProgressBar
                                            now={magicDamageRatio}
                                            variant="primary"
                                            key={2}>
                                        </ProgressBar>
                                        <ProgressBar
                                            now={trueDamageRatio}
                                            style={{ backgroundColor: "gray" }}
                                            key={3}>
                                        </ProgressBar>
                                    </ProgressBar>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container>
            {summonerMatchData.map(match => (
                <Row key={match.data.match_id}>
                    {participantCard(match)}
                </Row>
            ))}
        </Container>
    );
}