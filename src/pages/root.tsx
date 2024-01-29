import NavBar from "widgets/navbar/navbar";
import { Outlet } from "react-router";
export default function Root() {
  return (
    <div>
      <NavBar></NavBar>
      <div style={{ marginTop: "9vh", height:"90vh", overflowY:"hidden"}}>
        <Outlet ></Outlet>
      </div>
    </div>
  );
}
