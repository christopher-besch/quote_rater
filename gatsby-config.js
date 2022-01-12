const path = require("path");

module.exports = {
    plugins: [
        // support TypeScript
        {
            resolve: "gatsby-plugin-typescript",
        },
        // define TypeScript config path
        {
            resolve: "gatsby-plugin-tsconfig-paths",
            options: {
                configFile: `${__dirname}/tsconfig.json`,
            },
        },
        // added explicitly to exclude GraphQL type files
        {
            resolve: "gatsby-plugin-page-creator",
            options: {
                path: path.join(__dirname, "src", "pages"),
                ignore: ["**/__generated__/*"],
            }
        },
        // support sass
        {
            resolve: "gatsby-plugin-sass",
        },
        // image handling
        {
            resolve: "gatsby-transformer-sharp",
        },
        {
            resolve: "gatsby-plugin-sharp",
        },
        {
            resolve: "gatsby-plugin-image",
        },
        // load markdown
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        // load images from markdown
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 8000,
                        },
                    },
                ]
            }
        },
        // support custom header
        {
            resolve: "gatsby-plugin-react-helmet",
        },
    ],
    // can be loaded from page with GraphQL
    siteMetadata: {
        source: "https://github.com/christopher-besch/quote_rater",
        address: "https://quote_rater.chris-besch.com",
    },
}
