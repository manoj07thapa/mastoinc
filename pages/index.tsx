import Head from 'next/head'
import Image from 'next/image'
import { Auth } from "aws-amplify";


export default function Home() {
  return (
    <>
      <Head>
        <title>MastoInc</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-2xl text-red-900">
        Musto

        <button
          type="button"

          onClick={() => {
            Auth.signOut();

          }}

          className='ml-12 mt-12 bg-red-500 text-white px-2 py-2 ron'
        >

          <p>Signout</p>
        </button>
      </main>
    </>
  )
}
