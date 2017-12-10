const _defaultsDeep = require('lodash/defaultsDeep');

const defaultConfig = {
  blogPostDir: "posts", // The name of directory that contains your posts.
  siteTitle: "Michelle D Zhang", // Site title.
  siteTitleAlt: "Michelle D Zhang Personal Site", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1028.png", // Logo used for SEO and manifest.
  // siteUrl: "", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: true, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "Michelle D. Zhang is a full stack software engineer", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "TODO", // FB Application ID for using app insights
  siteGATrackingID: "UA-66633424-1", // Tracking code ID for google analytics.
  disqusShortname: "mdzhang (TODO)", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  userName: "Michelle D Zhang", // Username to display in the author segment.
  // userTwitter: "michelledzhang", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Remote", // User location to display in the author segment.
  userAvatar: "http://www.gravatar.com/avatar/6ec7da55967198680c3c4c81f880ab0c?s=1028", // User avatar to display in the author segment.
  userDescription: "Hi! I'm Michelle, a software engineer. I currently work remotely for Flashpoint, a business risk intelligence firm.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/mdzhang",
      iconClassName: "fa fa-github"
    },
/*     { */
      // label: "Twitter",
      // url: "https://twitter.com/michelledzhang",
      // iconClassName: "fa fa-twitter"
    /* }, */
    {
      label: "Email",
      url: "mailto:zhang.michelle.d@gmail.com",
      iconClassName: "fa fa-envelope"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/mdzhang",
      iconClassName: "fa fa-linkedin"
    }
  ],
  copyright: "Copyright © 2017. Michelle D Zhang" // Copyright string for the footer of the website and RSS feed.
};

const configs = {
  staging: {
    siteUrl: 'http://staging-1.mdzhang.com',
  },
  production: {
    siteUrl: 'http://mdzhang.com',
  }
};

const env = process.env.NODE_ENV || 'development';
const config = {};

_defaultsDeep(config, defaultConfig, configs[env.toLowerCase()] || {});

module.exports = config;

