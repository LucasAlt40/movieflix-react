import React from "react";
import { useParams } from "react-router-dom";
import CatalogHome from "../components/CatalogHome";
import ResponsiveHeader from "../components/ResponsiveHeader";
import SideMenu from "../components/SideMenu";
import SideMenuSearch from "../components/SideMenuSearch";

export default function Home() {
  const { typeMedia } = useParams();
  return (
    <>
      <ResponsiveHeader />
      <main >
        <SideMenu activePageHome={true} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CatalogHome typeMedia={typeMedia} />
        </div>
        <SideMenuSearch typeMedia={typeMedia} />
      </main>
    </>
  );
}
