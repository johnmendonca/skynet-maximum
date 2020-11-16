/*
 * This page is not actually a part of the app, but it remains for
 * educational purposes.  It is a React port of the "Creating Your First
 * Web App on Skynet" article found at:
 * https://blog.sia.tech/creating-your-first-web-app-on-skynet-ec6f4fff405f
*/

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import { useSkynet } from 'lib/skynet'
import styles from 'styles/FirstApp.module.css'

export default function FirstApp() {
  const skynet = useSkynet()
  const [filename, setFilename] = useState(null)
  const [skylink, setSkylink] = useState(null)
  const [directLink, setDirectLink] = useState(null)
  const fileSelect = useRef()

  const createMediaPage = useCallback((mainMediaFile) => {
    const pageContent = `
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>Skynet-Generated Webpage</title>
  <style>
    h1 {
    font-size: 48px;
    font-weight: 500;
    margin-top: 40px;
    margin-bottom: 10px;
    }
  </style>
  </head>
  <body>
  <center><h1>Check out your Media!</h1></center>
  <img src="media.jpg">
  </body>
</html>`;

    // Establish the index file in the directory.
    const mediaFolder = {
      'index.html': new File([pageContent], 'index.html', { type: 'text/html' }),
      'media.jpg': mainMediaFile
    }

    // Upload the media tip as a directory.
    try {
      (async () => {
        // Uploading the directory will return a skylink. The skylink is prefix
        // with 'sia:' to UX purposes
        const skylink = await skynet.uploadDirectory(mediaFolder, 'mediaFolder')
        // For the redirect link we want to trim the 'sia:' prefix so that the
        // link is https://siasky.net/<skylink hash>/
        setDirectLink(skynet.portalUrl + '/' + skylink.replace('sia:', '') + '/')
        setSkylink(skylink)
      })()
    } catch (error) {
      alert(error)
    }
  }, [skynet])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Super Awesome Skapp</title>
      </Head>

      <div className={styles.wrapper}>
        <h1 className={styles.header}>Create a Media Page</h1>
        <span className={styles.caps} style={{fontSize: "16px"}}>Your Media, Decentralized &amp; Encrypted.</span>
        <br />

        <div className={styles.snippetWrapper}>
          <label className={styles.btn}>
            <input ref={fileSelect} type="file" id="mediaFile"
                   onChange={(event) => setFilename(event.target.value)}
                   style={{display: "none"}}/>
            Upload your Media
          </label>
        </div>
        <br />

        <span className={styles.snippet} id="file-selected">{filename}</span>

        <div className={styles.cta}>
          <button id="save-trigger" className={styles.btn} onClick={() => createMediaPage(fileSelect.current.files[0])}>
            Create Media Page!
          </button>
        </div>

        <a className={styles.skylinks} id="mediaLink" href={directLink}>{skylink}</a>

        <span style={{marginTop: "auto"}} className={styles.caps}>Powered by Sia Skynet</span>
      </div>
    </>
  )
}
