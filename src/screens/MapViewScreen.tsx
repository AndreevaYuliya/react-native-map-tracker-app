import React, { useEffect } from 'react';

import MapView, { Marker, Callout } from 'react-native-maps';
import { Text } from 'react-native-paper';

import { observer } from 'mobx-react-lite';

import objectMarkerStore from '../stores/ObjectMarkerStore';

import { BASE_LAT, BASE_LNG, startMockServer, stopMockServer } from '../mock/mockServer';

const MapViewScreen = observer(() => {
    useEffect(() => {
        startMockServer((data) => {
            data.forEach((item) => {
                if (!objectMarkerStore.objects.find((object) => object.id === item.id)) {
                    objectMarkerStore.addObject(item);
                } else {
                    objectMarkerStore.updateObject(item.id, item.coordinates, item.direction);
                }
            });
        });

        return () => {
            stopMockServer();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            objectMarkerStore.checkLostObjects();
        }, 60_000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <MapView
            initialRegion={{
                latitude: BASE_LAT,
                longitude: BASE_LNG,
                latitudeDelta: 0.03,
                longitudeDelta: 0.02,
            }}
            style={{ flex: 1 }}
        >
            {
                objectMarkerStore.objects.map((object) => (
                    <Marker
                        key={object.id}
                        coordinate={{ latitude: object.coordinates[0], longitude: object.coordinates[1] }}
                        title={`Object ${object.id}`}
                        description={`Direction: ${object.direction}°`}
                        pinColor={objectMarkerStore.lostObjects.has(object.id) ? 'red' : 'blue'} // Червоний для втрачених
                    >
                        <Callout>
                            <Text>Object ID: {object.id}</Text>
                            <Text>Direction: {object.direction}°</Text>
                        </Callout>
                    </Marker>
                ))
            }
        </MapView>
    );
});

export default MapViewScreen;
