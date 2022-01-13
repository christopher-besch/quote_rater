import React, { useState } from "react";

import Layout from "src/components/layout";
import * as styles from "src/styles/home.module.scss";
import Heading from "src/components/heading";

let rates_per_quote = 5;
let quotes_url: string | undefined = undefined;

const Home: React.FC = (props) => {
    const [show_cards, set_show_cards] = useState(false);
    const [left_card, set_left_card] = useState("left_card");
    const [right_card, set_right_card] = useState("right_card");

    const quote_regex = /### +(.*)\n```\n((?:.|\n)*?)\n—(.*)\n```\n((?:- +.+\n)*)/gm;

    function onload() {

    }

    function update() {
        let url_serach_params = new URLSearchParams(location.search);
        console.log(url_serach_params.get("test"));
        console.log(rates_per_quote);
        rates_per_quote = 10;
        set_show_cards(true);
    }

    return (
        <Layout>
            <Heading heading="Quote Rater" />
            <button onClick={update} onLoad={onload}>Update</button>
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
                </div>
            )
            }
        </Layout >
    );
};
export default Home;
