/*
 * This is a React port of:
 * https://github.com/DaWe35/SkyID-example-note-dapp
 */

import React, { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import { useSkyID } from 'lib/skyid'
import styles from 'styles/NotesApp.module.css'

const NotesApp = () => {
  const [skyid, skyidStatus] = useSkyID()
  const textareaRef = useRef()

  const loggedIn = useCallback(() => {
    return skyidStatus === 'login_success'
  }, [skyidStatus])

  const fetchNote = useCallback(() => {
    // fetch file
		skyid.getFile('note', function(response, revision) {
			if (response == '') { // file not found
				textareaRef.current.value = ''
			} else { // success
				var respObs = JSON.parse(response)
				textareaRef.current.value = respObs.data
			}
		})
  }, [skyid])

  const saveNote = useCallback(() => {
    // convert note to json
		var json = JSON.stringify({ data: textareaRef.current.value })

		// upload to registry with SkyID key
		skyid.setFile('note', json, function(response) {
			if (response != true) {
				alert('Sorry, but upload failed :(')
			}
		})
  }, [skyid])

  useEffect(() => {
    if (loggedIn()) {
      fetchNote()
    }
  }, [skyidStatus])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Note &amp; SkyID</title>
      </Head>

      <div className={styles.wrapper}>
        {skyid && loggedIn() && <div className={styles.logoutBar}>
          <a onClick={() => skyid.sessionDestroy()}>Logout</a>
        </div>}

        {!skyid && <div>
          <h2 className="py-40">Loading...</h2>
        </div>}

        {skyid && !loggedIn() && <div>
          <h2 className={styles.header}>Make a note while using <a href="https://sky-id.hns.siasky.net">SkyID</a> for authentication</h2>

          <button onClick={() => skyid.sessionStart()} className={`${styles.skyidButton} ${styles.buttonBlow} ${styles.bigMargin}`}>
            <img src="SkyID_Logo_128_white.png" alt="SkyID" className={styles.skyidLogo} />
            Sign in with SkyID
          </button>
        </div>}

        {skyid && loggedIn() && <div className="small-margin">
          <textarea id="note" ref={textareaRef} className="p-3 w-112 h-64 rounded text-black max-w-full" defaultValue="Loading..."></textarea><br />
          <button id="save_note" className={`${styles.skyidButton} ${styles.smallMarginTop}`} onClick={() => saveNote()}>Save unencrypted note</button>
        </div>}

        <footer>Read more on <a href="https://github.com/DaWe35/SkyID-example-note-dapp" target="_blank">GitHub</a> -
          forked from <a href="https://skyportal.xyz/_BF4CHsFIichxjdgAFhU-tEKqsoPDxC9OMsWbMkyMbz4KQ/" target="_blank">Note to myself</a>
        </footer>
    </div>
    </>
  )
}

export default NotesApp

