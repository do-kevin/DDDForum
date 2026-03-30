import Layout from "~/components/Layout";
import type { Route } from "./+types/MainPage";
// import { getPostsStub } from "~/stubs/posts.stub";
import { PostsList } from "~/components/PostsList";
import { useEffect, useState, type MouseEvent } from "react";
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
  const [refetch, setRefetch] = useState(0);

  // const posts = getPostsStub();

  const getPopularPosts = async () => {
    try {
      const response = await postGateway.getPopularPosts();
      setPostList(response.data.data);
      setRefetch(refetch + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewPosts = async () => {
    try {
      const response = await postGateway.getRecentPosts();
      setPostList(response.data.data);
      setRefetch(refetch + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopularButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getPopularPosts();
  };

  const handleNewButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getNewPosts();
  };

  useEffect(() => {
    if (refetch === 0) {
      getPopularPosts();
    }
  }, [refetch]);

  return (
    <>
      <Layout>
        <div className="mb-4">
          <button
            className="font-bold text-2xl mr-1"
            onClick={handlePopularButton}
          >
            Popular
          </button>{" "}
          <span className="font-bold">|</span>
          <button className="ml-2" onClick={handleNewButton}>
            New
          </button>
        </div>
        <PostsList posts={postList} />
      </Layout>
    </>
  );
}
