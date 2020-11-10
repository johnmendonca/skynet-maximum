import React, { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import { SkynetClient } from 'skynet-js'

export default function Home() {
  const [skynet, setSkynet] = useState(null)
  const [filename, setFilename] = useState(null)
  const [skylink, setSkylink] = useState(null)
  const [directLink, setDirectLink] = useState(null)
  const fileSelect = useRef()

  useEffect(() => {
    setSkynet(new SkynetClient())
  }, [])

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
        setDirectLink('/' + skylink.replace('sia:', '') + '/')
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
        <link rel="stylesheet" href="style.css" />
      </Head>

      <div className="wrapper">
        <h1>Create a Media Page</h1>
        <span className="caps" style={{fontSize: "16px"}}>Your Media, Decentralized &amp; Encrypted.</span>
        <br />

        <div className="snippet-wrapper">
          <label className="btn">
            <input ref={fileSelect} type="file" id="mediaFile" onChange={(event) => setFilename(event.target.value)} />
            Upload your Media
          </label>
        </div>
        <br />

        <span className="snippet" id="file-selected">{filename}</span>

        <div className="cta">
          <button id="save-trigger" className="btn" onClick={() => createMediaPage(fileSelect.current.files[0])}>
            Create Media Page!
          </button>
        </div>

        <a className="skylinks" id="mediaLink" href={directLink}>{skylink}</a>

        <span style={{marginTop: "auto"}} className="caps">Powered by Sia Skynet</span>
      </div>
    </>
  )
}
