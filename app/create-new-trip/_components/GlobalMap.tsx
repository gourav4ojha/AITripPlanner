"use client";
import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useTripDetail } from '@/app/provider';
import { Activity, Itinerary } from './ChatBox';

function GlobalMap() {
    const mapContainerRef = useRef(null);
    const { tripDetailInfo } = useTripDetail();

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current ?? '',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.5, 40],
            zoom: 1.7,
            projection: 'globe',
        });

        const bounds = new mapboxgl.LngLatBounds();

        map.on('load', () => {
            tripDetailInfo?.itinerary?.forEach((day: Itinerary) => {
                day.activities?.forEach((activity: Activity) => {
                    const lng = activity.geo_coordinates?.longitude;
                    const lat = activity.geo_coordinates?.latitude;
                    const place = activity.place_name;

                    if (lng !== undefined && lat !== undefined) {
                        const marker = new mapboxgl.Marker({ color: 'red' })
                            .setLngLat([lng, lat])
                            .setPopup(
                                new mapboxgl.Popup({ offset: 25 })
                                    .setText(place || 'Unknown Place')
                            )
                            .addTo(map);

                        // Extend bounds to include this marker
                        bounds.extend([lng, lat]);
                    }
                });
            });

            // Fit map to bounds (includes all markers)
            if (!bounds.isEmpty()) {
                map.fitBounds(bounds, { padding: 50, duration: 1000 });
            }
        });

        return () => map.remove();
    }, [tripDetailInfo]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: '95%',
                height: '85vh',
                borderRadius: 20,
            }}
        />
    );
}

export default GlobalMap;

