import Head from "next/head";

import client from "../../client";
import { HeroPost, MoreStories } from "../../components/Post";

export const config = {
  runtime: "experimental-edge",
};

export const getStaticProps = async () => {
  const posts = await client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
      _id,
      title,
      author->{
      name,
      image
    },
    description,
    mainImage,
    slug,
    publishedAt,
    }
  `);
  return {
    props: {
      allPosts: posts,
    },
  };
};

const Index = ({ allPosts }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Head>
        <title>Wasmer Blog</title>
      </Head>
      <div className="container">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.publishedAt}
            author={heroPost.author}
            slug={heroPost.slug.current}
            excerpt={heroPost.title}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </div>
      <div className="container">
        <h3>Old Blog</h3>
        <p>
          You can also find more posts in previous blog:&nbsp;
          <b>
            <a href="https://medium.com/wasmer">Wasmer Old Medium Blog</a>
          </b>
        </p>
        <br />
      </div>
    </>
  );
};
export default Index;
