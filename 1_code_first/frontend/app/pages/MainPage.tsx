import Layout from "~/components/Layout";
import type { Route } from "./+types/MainPage";
// import { getPostsStub } from "~/stubs/posts.stub";
import { PostsList } from "~/components/PostsList";
import { useEffect, useState } from "react";
import type { PostWithDetails } from "~/shared/post.types";
import { postGateway } from "~/controllers/post.gateway";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MainPage() {
  const [postList, setPostList] = useState<PostWithDetails[]>([]);

  // const posts = getPostsStub();

  const getPosts = async () => {
    try {
      const response = await postGateway.getRecentPosts();
      setPostList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Layout>
        <PostsList posts={postList} />
      </Layout>
    </>
  );
}
