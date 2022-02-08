import React, { Fragment } from "react";

import App from "next/app";
import type { AppProps } from "next/app";
import Head from "next/head";

// Global styles
import "../src/styles/index.css";

export default class extends App {
    render() {
        const { Component, pageProps }: AppProps = this.props;

        return (
            <Fragment>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <title>DeSo NFT First open Minting Machine | DiamondTools</title>
                    <link rel="icon" href="./favicon.ico" />
                </Head>

                <Component {...pageProps} />
            </Fragment>
        );
    }
}