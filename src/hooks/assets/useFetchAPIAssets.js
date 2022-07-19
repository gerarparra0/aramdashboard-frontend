import { useEffect, useState } from "react";

export default function useFetchAPIAssets() {
    const [version, setVersion] = useState("");
    const [championSquareAssets, setChampionSquareAssets] = useState("");
    const [itemSquareAssets, setItemSquareAssets] = useState("");
    const [profileIconAssets, setProfileIconAssets] = useState("");

    useEffect(() => {
        const fetchLatestAPIVersion = () => {
            fetch('https://ddragon.leagueoflegends.com/api/versions.json')
                .then(response => response.json())
                .then(data => setVersion(data[0]));
        }

        fetchLatestAPIVersion();

        setChampionSquareAssets("http://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/");
        setItemSquareAssets("http://ddragon.leagueoflegends.com/cdn/" + version + "/img/item/");
        setProfileIconAssets("http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/");

    }, [version]);

    return { version, championSquareAssets, itemSquareAssets, profileIconAssets };
}