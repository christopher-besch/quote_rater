import React from "react";

import * as styles from "src/styles/heading.module.scss";

interface HeadingProps {
    heading: string;
    sub_heading?: string;
    className?: string;
}
const Heading: React.FC<HeadingProps> = (props) =>
    <div className={`${styles.heading} ${props.className}`}>
        <h1>
            {props.heading}
        </h1>
        <span className={styles.sub_heading}>{props.sub_heading}</span>
        <hr />
    </div>

export default Heading;
