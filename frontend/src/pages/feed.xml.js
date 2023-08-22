import rss from '@astrojs/rss';
import { getPosts } from '@src/lib/api';

export async function get(context) {
  const posts = await getPosts();
  return rss({
    title: 'M D Zhang',
    description: 'human',
    stylesheet: false,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt,
      description: post.description,
      link: `/blog/${post.slug.current}/`,
    })),
    customData: '<language>en-us</language>',
    canonicalUrl: 'https://mdzhang.com',
  });
}
