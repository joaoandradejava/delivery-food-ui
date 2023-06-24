import Toast from "../Toast";
import MenuLateralAdmin from "./MenuLateralAdmin";
import MenuTopoAdmin from "./MenuTopoAdmin";

interface LayoutAdminProps {
  children: any;
}

export default function LayoutAdmin(props: LayoutAdminProps) {
  const { children } = props;

  return (
    <div className="h-screen">
      <MenuTopoAdmin />
      <div
        className="flex gap-3"
        style={{ backgroundColor: "#f2f2f2", height: "94vh" }}
      >
        <div className="w-full md:w-2/12  bg-gray-900">
          <MenuLateralAdmin />
        </div>
        <div className="w-full md:w-full p-5 overflow-auto">{children}</div>
      </div>
      <Toast />
    </div>
  );
}
