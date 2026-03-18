import Header from "./Header";

export const Content = ({ children }: any) => {
  return <div className="content-container">{children}</div>;
};

export default function Layout({ children }: any) {
  return (
    <main
      className="flex flex-col mx-auto w-full max-w-5xl"
      style={{ border: "4px solid blue" }}
    >
      <Header pathName={"/"} />
      <Content>{children}</Content>
    </main>
  );
}
