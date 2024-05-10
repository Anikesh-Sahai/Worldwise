import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contextes/CitiesContext";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";

function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParams] = useSearchParams();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation(mapPosition);

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    useEffect(
        function () {
            if (lat && lng) setMapPosition([lat, lng]);
        },
        [lat, lng]
    );

    useEffect(
        function () {
            if (geolocationPosition && typeof geolocationPosition === "object")
                setMapPosition([geolocationPosition[0], geolocationPosition[1]]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            <Button type="position" onclick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use Your Position"}
            </Button>
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
