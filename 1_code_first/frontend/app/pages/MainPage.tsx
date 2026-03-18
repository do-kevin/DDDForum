import Layout from "~/components/Layout";
import type { Route } from "./+types/MainPage";
import { getPostsStub } from "~/stubs/posts.stub";
import { PostsList } from "~/components/PostsList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MainPage() {
  const posts = getPostsStub();

  return (
    <>
      <Layout>
        <PostsList posts={posts} />
      </Layout>
    </>
  );
}
