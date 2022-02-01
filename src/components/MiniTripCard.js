import React from 'react';
import TripCollections from './TripCollections';

export default function MiniTripCard({trip}) {
  return (
  <div>
      <h1>{trip.name}</h1>
      <h2>{trip.start_date} to {trip.end_date}</h2>
  </div>);
}
