import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchSummonerData(summonerName, region, submitted) {
    const [summonerData, setSummonerData] = useState(null);
    const [summonerMatchData, setSummonerMatchData] = useState(null);

    useEffect(() => {
        if (submitted) {

            const fetchSummonerData = async () => {
                const response = await axios.get(`/api/summoner/${summonerName}?region=${region.toLowerCase()}`);
                setSummonerData(response.data);

                let requests = [];

                response.data.summoner_info.match_history.map(match_id => (requests = [...requests, `/api/match/${match_id}?region=${region.toLowerCase()}`]));
                Promise.all(requests.map(req => axios.get(req))).then(axios.spread((...allData) => setSummonerMatchData(allData)));
            }

            fetchSummonerData();
        }
    }, [summonerName, region, submitted]);

    return { summonerData, summonerMatchData };
}