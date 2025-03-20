"use client";

import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import LocationPermissionDialog from "./_components/LocationPermissionDialog";
import { useCoordinatesComparison } from "@/hooks/useCoordinatesComparison";
import { useDebounceWithComparison } from "@/hooks/useDebounceWithComparison";
import { DEFAULT_COORDINATES } from "@/constants";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeatherData } from "@/hooks/useWeatherData";
import WeatherDashboardSkeleton from "./_components/WeatherDashboardSkeleton";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./_components/ErrorFallback";
import Navbar from "@/components/shared/Navbar";
import WeatherNavbar from "./_components/WeatherNavbar";

const WeatherDashboard = lazy(
  () => import("@/components/shared/WeatherDashboard")
);

export default function WeatherApp() {
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [unit] = useState<"metric" | "imperial">("metric");
  const [showLocationDialog, setShowLocationDialog] = useState(true);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const compareCoordinates = useCoordinatesComparison();
  const debouncedCoordinates = useDebounceWithComparison(
    coordinates,
    500,
    compareCoordinates
  );

  const {
    latitude,
    longitude,
    loading: locationLoading,
    hasPermission,
  } = useGeolocation({
    timeout: 1000,
    enabled: geolocationEnabled,
  });

  const { weatherData, error, isLoading, setError } = useWeatherData(
    debouncedCoordinates,
    locationLoading,
    hasInitialLoad
  );

  // Location handlers
  const handleLocationChange = useCallback(
    (lat: number, lon: number) => {
      const newCoords = { lat, lon };
      if (!compareCoordinates(coordinates, newCoords)) {
        setIsManualSelection(true);
        setGeolocationEnabled(false);
        setCoordinates(newCoords);
        setHasInitialLoad(true);
      }
    },
    [coordinates, compareCoordinates]
  );

  const handleUseCurrentLocation = useCallback(() => {
    setIsManualSelection(false);
    setGeolocationEnabled(true);
  }, []);

  const handleLocationPermission = useCallback((allow: boolean) => {
    setShowLocationDialog(false);
    setGeolocationEnabled(allow);
    setIsManualSelection(!allow);
    if (!allow) {
      setCoordinates(DEFAULT_COORDINATES);
    }
    setHasInitialLoad(true);
  }, []);

  // Update coordinates based on geolocation
  useEffect(() => {
    if (
      geolocationEnabled &&
      hasPermission &&
      !isManualSelection &&
      !compareCoordinates(coordinates, { lat: latitude, lon: longitude })
    ) {
      setCoordinates({ lat: latitude, lon: longitude });
      setHasInitialLoad(true);
    }
  }, [
    geolocationEnabled,
    hasPermission,
    isManualSelection,
    latitude,
    longitude,
    coordinates,
    compareCoordinates,
  ]);

  // Content renderer
  const renderContent = useCallback(() => {
    if (
      showLocationDialog ||
      (!isManualSelection && locationLoading && !hasInitialLoad)
    ) {
      return <WeatherDashboardSkeleton />;
    }

    if (error) {
      return (
        <div
          className="flex items-center justify-center flex-1"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (!weatherData || isLoading) {
      return <WeatherDashboardSkeleton />;
    }

    return (
      <Suspense fallback={<WeatherDashboardSkeleton />}>
        <WeatherDashboard weatherData={weatherData} unit={unit} />
      </Suspense>
    );
  }, [
    showLocationDialog,
    isManualSelection,
    locationLoading,
    hasInitialLoad,
    error,
    weatherData,
    isLoading,
    unit,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <LocationPermissionDialog
        open={showLocationDialog}
        onOpenChange={setShowLocationDialog}
        onAllowLocation={() => handleLocationPermission(true)}
        onDenyLocation={() => handleLocationPermission(false)}
      />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setError(null);
          handleUseCurrentLocation();
        }}
      >
        <WeatherNavbar
          onLocationChange={handleLocationChange}
          onUseCurrentLocation={handleUseCurrentLocation}
          isUsingCurrentLocation={!isManualSelection}
        />

        {renderContent()}
      </ErrorBoundary>
    </div>
  );
}
