import Header from "./Header";

export const Content = ({ children }: any) => {
  return <div className="content-container">{children}</div>;
};

export default function Layout({ children }: any) {
  return (
    <main className="flex flex-col mx-auto w-full max-w-6xl p-4 box-border bg-slate-50">
      <Header pathName={"/"} />
      <Content>{children}</Content>
    </main>
  );
}
