import React from "react";

import Layout from "src/components/layout";
import * as styles from "src/styles/home.module.scss";
import Heading from "src/components/heading";

const Home: React.FC = (props) => {
    return (
        <Layout>
            <Heading heading="Quote Rater" />
        </Layout>
    );
};
export default Home;
