import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { SiteInfo } from "./__generated__/site-info";
import { Helmet } from "react-helmet";

import Heading from "src/components/heading";
import "src/styles/global.scss";
import * as styles from "src/styles/layout.module.scss";

interface LayoutProps {
    heading?: string;
    icon?: string;
}
const Layout: React.FC<LayoutProps> = (props) => {
    const data: SiteInfo = useStaticQuery(graphql`
query SiteInfo {
  site {
    siteMetadata {
      source
      address
    }
  }
}
    `);
    const source = data.site?.siteMetadata?.source as string;
    const address = data.site?.siteMetadata?.address as string;
    const title = props.heading ? `Quote Rater—${props.heading}` : "Quote Rater";

    return (
        <div>
            <Helmet htmlAttributes={{ lang: "en" }}>
                <meta charSet="utf-8" />
                <meta property="og:description" content={title} />
                <meta name="description" content={title} />
                {/* TODO: add social preview */}
                {/* <meta property="og:image" image=""/> */}
                <title>{title}</title>
                <link rel="canonical" href={address} />
                <link rel="shortcut icon" href="/favicon.png" />
            </Helmet>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <h1>Quote Rater</h1>
                </div>
                <div>
                    <input type="checkbox" id="nav_toggle" />
                    <label htmlFor="nav_toggle" className={styles.hamburger}>&#9776;</label>
                    <ul className={styles.nav_menu}>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
            </nav >

            <div className={styles.content}>
                {props.heading ? <Heading heading={props.heading} /> : undefined}
                {props.children}
            </div>

            <footer className={styles.footer}>
                <ul>
                    <li className={styles.link}><a href={source} target="_blank">Source</a></li>
                    <li><p>&#169; 2022</p></li>
                    <li className={styles.emoji}><p>🔗</p></li>
                </ul>
            </footer>
        </div>
    );
}
export default Layout;
