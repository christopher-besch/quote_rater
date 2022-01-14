import React, { useState, useEffect } from "react";

import Layout from "src/components/layout";
import * as styles from "src/styles/home.module.scss";
import Heading from "src/components/heading";
import { Quote, QuotesHandler } from "src/utils/quotes";

const Home: React.FC = (props) => {
    let [quotes_handler, set_quotes_handler] = useState<QuotesHandler>(new QuotesHandler());

    // run for each refresh
    useEffect(() => {
        let url_search_params = new URLSearchParams(location.search);
        let quotes_url_raw = url_search_params.get("quotes_url");
        let quotes_url_input = document.getElementById("quotes_url_input") as HTMLButtonElement;
        if (quotes_url_input.value == "")
            quotes_url_input.value = quotes_url_raw ? quotes_url_raw : "";
    });

    function load() {
        let url_search_params = new URLSearchParams(location.search);
        let quotes_url_input = document.getElementById("quotes_url_input") as HTMLButtonElement;
        let quotes_url = quotes_url_input.value;
        url_search_params.set("quotes_url", quotes_url);
        window.history.replaceState({}, "", `${location.pathname}?${url_search_params.toString()}`);
        let new_quotes_handler = new QuotesHandler(quotes_url, () => {
            set_quotes_handler(new_quotes_handler);
        });
    }

    function left_better() {
        set_quotes_handler((quotes_handler) => {
            quotes_handler

            quotes_handler.next_question();
            return quotes_handler;
        });
    }
    function equal() {
        set_quotes_handler((quotes_handler) => {
            quotes_handler.next_question();
            return quotes_handler;
        });
    }
    function right_better() {
        set_quotes_handler((quotes_handler) => {

            quotes_handler.next_question();
            return quotes_handler;
        });
    }

    return (
        <Layout>
            <Heading heading="Quote Rater" />
            <label htmlFor="quotes_url_input">Input Quotes URL: </label>
            <input id="quotes_url_input" type="text"></input><br />
            <button onClick={load}>Load</button>
            <p>{quotes_handler.get_quotes_amount()}</p>

            {quotes_handler.get_should_render() && (
                <div>
                    <p>quotes: {quotes_handler.get_quotes_amount()}</p>
                    <p>components: {quotes_handler.get_components_amount()}</p>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <pre><code>
                                {quotes_handler.get_left_quote().text}
                            </code></pre>
                        </div>
                        <div className={styles.card}>
                            <pre><code>
                                {quotes_handler.get_right_quote().text}
                            </code></pre>
                        </div>
                    </div>
                    <button onClick={left_better}>Left Better</button>
                    <button onClick={equal}>Roughly Equal</button>
                    <button onClick={right_better}>Right Better</button>
                    <h1>Ordered Quotes:</h1>
                    <pre><code>
                        {quotes_handler.get_quotes_string()}
                    </code></pre>
                </div>
            )}
        </Layout >
    );
};
export default Home;
