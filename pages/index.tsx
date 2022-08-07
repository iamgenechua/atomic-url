import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UrlShortener from '../components/UrlShortener';

export default function Home() {
  return (
   <>
    <UrlShortener />
   </>
  )
}
