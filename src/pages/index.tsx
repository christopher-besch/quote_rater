import React, { useState, useEffect } from "react";

import Layout from "src/components/layout";
import * as styles from "src/styles/home.module.scss";
import Heading from "src/components/heading";
import {
    LoadedQuotes,
    QuotesHandler,
    get_loaded_quotes,
    get_quotes_handler,
    setup_loaded_quotes,
    setup_quotes_handler,
    update_loaded_quotes,
    get_left_quote,
    get_right_quote,
    get_quotes_string,
    update_question,
    set_left_better,
    set_right_better,
} from "src/utils/quotes";

const Home: React.FC = (props) => {
    let [loaded_quotes, set_loaded_quotes] = useState<LoadedQuotes>(get_loaded_quotes());
    let [quotes_handler, set_quotes_handler] = useState<QuotesHandler>(get_quotes_handler());

    // run for each refresh
    useEffect(() => {
        // load input values from url
        let url_search_params = new URLSearchParams(location.search);

        let quotes_url_raw = url_search_params.get("quotes_url");
        let quotes_url_input = document.getElementById("quotes_url_input") as HTMLInputElement;
        if (quotes_url_input.value == "")
            quotes_url_input.value = quotes_url_raw ? quotes_url_raw : "";

        let answers_json_raw = url_search_params.get("answers_json");
        let answers_json_input = document.getElementById("answers_json_input") as HTMLInputElement;
        if (answers_json_input.value == "")
            answers_json_input.value = answers_json_raw ? answers_json_raw : "[]";
    });

    function load() {
        console.log("loading quotes: ...");
        let quotes_url_input = document.getElementById("quotes_url_input") as HTMLInputElement;
        let answers_json_input = document.getElementById("answers_json_input") as HTMLInputElement;

        setup_loaded_quotes(quotes_url_input, answers_json_input, (new_loaded_quotes) => {
            set_loaded_quotes(new_loaded_quotes);
            set_quotes_handler(setup_quotes_handler(new_loaded_quotes));
            console.log("loading quotes: ok")
        });
    }

    function left_button_callback() {
        set_quotes_handler((quotes_handler) => {
            let new_quotes_handler = set_left_better(quotes_handler);
            set_loaded_quotes((loaded_quotes) => {
                return update_loaded_quotes(loaded_quotes, new_quotes_handler);
            });
            return new_quotes_handler;
        });
    }
    function equal_button_callback() {
        set_quotes_handler((quotes_handler) => {
            let new_quotes_handler = update_question(quotes_handler);
            set_loaded_quotes((loaded_quotes) => {
                return update_loaded_quotes(loaded_quotes, new_quotes_handler);
            });
            return new_quotes_handler;
        });
    }
    function right_button_callback() {
        set_quotes_handler((quotes_handler) => {
            let new_quotes_handler = set_right_better(quotes_handler);
            set_loaded_quotes((loaded_quotes) => {
                return update_loaded_quotes(loaded_quotes, new_quotes_handler);
            });
            return new_quotes_handler;
        });
    }

    return (
        <Layout>
            <Heading heading="Quote Rater" />
            <label htmlFor="quotes_url_input">Input Quotes URL: </label>
            <input id="quotes_url_input" type="text"></input><br />
            <label htmlFor="answers_json_input">Input Answered JSON: </label>
            <input id="answers_json_input" type="text"></input><br />
            <button onClick={load}>Load</button>

            {quotes_handler.should_render && (
                <div>
                    <p>quotes: {quotes_handler.quotes_amount}</p>
                    <p>components: {quotes_handler.components_amount}</p>
                    <p>answered questions: {quotes_handler.answers.length}</p>
                    {!quotes_handler.done &&
                        <div>
                            <button onClick={left_button_callback}>First Better</button>
                            <button onClick={equal_button_callback}>Roughly Equal</button>
                            <button onClick={right_button_callback}>Second Better</button>
                            <div className={styles.cards}>
                                <div className={styles.card}>
                                    <pre><code>
                                        {get_left_quote(loaded_quotes, quotes_handler)?.text}
                                    </code></pre>
                                </div>
                                <div className={styles.card}>
                                    <pre><code>
                                        {get_right_quote(loaded_quotes, quotes_handler)?.text}
                                    </code></pre>
                                </div>
                            </div>
                        </div>
                    }
                    <h1>Ordered Quotes:</h1>
                    <pre><code>
                        {get_quotes_string(loaded_quotes, quotes_handler)}
                    </code></pre>
                </div>
            )}
        </Layout >
    );
};
export default Home;
