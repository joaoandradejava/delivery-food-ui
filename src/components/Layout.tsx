import MenuTopo from "./MenuTopo";
import Toast from "./Toast";

interface LayoutProps {
  children: any;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="h-screen overflow-y-auto">
      <MenuTopo />
      {children}
      <Toast />
    </div>
  );
}
