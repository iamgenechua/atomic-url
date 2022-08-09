import React from 'react';
import Navbar from '../components/Navbar';
import UrlShortener from '../components/UrlShortener';
import { LandingPage } from '../styles/styled-components';

export default function Home() {
  return (
    <>
      <LandingPage>
        <div>
          <Navbar />
          <UrlShortener />
        </div>
      </LandingPage>

    </>
  )
}
