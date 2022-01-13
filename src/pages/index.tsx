import React, { useState, useEffect } from "react";

import Layout from "src/components/layout";
import * as styles from "src/styles/home.module.scss";
import Heading from "src/components/heading";

const quote_regex = /### +(.*)\n```\n((?:.|\n)*?)\n—(.*)\n```\n((?:- +.+\n)*)/gm;

type Quote = {
    origin: string;
    text: string;
    author: string;
    comments: string;
};

const Home: React.FC = (props) => {
    let [show_cards, set_show_cards] = useState(false);
    let [left_card, set_left_card] = useState("left_card");
    let [right_card, set_right_card] = useState("right_card");
    let [quotes_url, set_quotes_url] = useState("");

    let url_search_params: URLSearchParams;

    let quotes: Quote[];
    let adj: number[][];

    useEffect(() => {
        url_search_params = new URLSearchParams(location.search);
        let quotes_url_raw = url_search_params.get("quotes_url");

        set_quotes_url(quotes_url_raw ? quotes_url_raw : "");
    });

    function dwn(url: string, callback: { (response: string): void; }): void {
        let request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status == 200)
                callback(request.responseText);
            else {
                console.error(`Failed to load json '${url}' with status ${request.status}`);
            }
        };
        request.onerror = () => {
            console.error(`Failed to load json '${url}'`);
        };
        request.open("GET", url, true);
        request.send();
    }

    function load() {
        let quotes_url_input = document.getElementById("quotes_url_input") as HTMLButtonElement;
        set_quotes_url(quotes_url_input.value);
        url_search_params.set("quotes_url", quotes_url);
        window.history.replaceState({}, "", `${location.pathname}?${url_search_params.toString()}`);
        console.log(quotes_url_input.value);
        console.log(quotes_url);

        // dwn(quotes_url, (response) => {
        //     let match;
        //     while (match = quote_regex.exec(response)) {
        //         quotes.push({ origin: match[1], text: match[2], author: match[3], comments: match[4] });
        //         adj.push([]);
        //     }
        //     console.log(quotes);
        //     console.log(adj);
        // });
    }

    function left_better() {

    }
    function equal() {

    }
    function right_better() {

    }

    return (
        <Layout>
            <Heading heading="Quote Rater" />
            <label htmlFor="quotes_url_input">Input Quotes URL: </label>
            <input id="quotes_url_input" type="text" placeholder={quotes_url}></input><br />
            <button onClick={load}>Load</button>

            {show_cards && (
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <pre><code>
                            {left_card}
                        </code></pre>
                    </div>
                    <div className={styles.card}>
                        <pre><code>
                            {right_card}
                        </code></pre>
                    </div>
                    <button onClick={left_better}>Left Better</button>
                    <button onClick={equal}>Roughly Equal</button>
                    <button onClick={right_better}>Right Better</button>
                </div>
            )
            }
            <p>d{quotes_url}</p>
        </Layout >
    );
};
export default Home;
