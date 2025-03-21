import React, { useEffect, useState } from "react";
import { db, collection, addDoc } from "../firebase";
import LocationInput from "./LocationInput.js";

const KakaoMap = () => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [placesService, setPlacesService] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=46509264a4db9734815e14e0710b1381&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                    level: 3,
                };
                const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
                setMap(newMap);
                setPlacesService(new window.kakao.maps.services.Places());

                // 지도 클릭 시 출발지 추가
                window.kakao.maps.event.addListener(newMap, "click", function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    console.log("지도 클릭됨", latlng);
                    addMarker("출발 위치", latlng);
                    saveLocationToFirebase("출발 위치", latlng.getLat(), latlng.getLng());
                });
            });
        };
    }, []);

    // 마커 추가 함수
    const addMarker = (address, coords) => {
        if (!map) return;

        const marker = new window.kakao.maps.Marker({
            position: coords,
            map: map,
        });

        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        map.setCenter(coords);
    };

    // Firebase에 출발지 저장
    const saveLocationToFirebase = async (name, lat, lng) => {
        try {
            console.log("Firebase 저장 시도:", name, lat, lng);
            await addDoc(collection(db, "locations"), {
                name,
                latitude: lat,
                longitude: lng,
                timestamp: new Date(),
            });
            console.log("Firebase 저장 성공");
        } catch (error) {
            console.error("파이어베이스 저장 오류:", error);
        }
    };

    return (
        <div>
            <LocationInput />
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
            <button onClick={() => console.log("모임 추천 위치 기능 구현 예정!")} style={{ marginTop: "10px" }}>
                모임 추천 위치 보기
            </button>
        </div>
    );
};

export default KakaoMap;
