import "./LayoutStyle.css";

interface ILayoutProps {
    children: JSX.Element[] | JSX.Element | string
}

 export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}