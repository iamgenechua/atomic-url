import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


function Form({setState}) {
  const handleSubmit = async (event) => {

    // Stop the form from submitting
    event.preventDefault();

    // Get the form data
    const data = {
      title: event.target.title.value,
    }

    // send data to server in json format
    const jsonData = JSON.stringify(data);

    // API endpoint where we send form data
    const endpoint = '/api/hello';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    }

    const response = await fetch(endpoint, options);

    const result = await response.json();
    console.log(result);

    setState(result.data);

  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default function Home() {
  const [state, setState] = useState('');
  return (
   <>
    <Form setState={setState}/>
    {state}
   </>
  )
}
