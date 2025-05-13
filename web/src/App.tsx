import { AppRoutes } from "./common/components/app-routes/AppRoutes";
import { Header } from "./common/components/header/Header";
import { Sidebar } from "./common/components/sidebar/Sidebar";
import { GlobalWrapper } from "./common/components/wrappers/global-wrapper/GlobalWrapper";
import { RightSideWrapper } from "./common/components/wrappers/right-side-wrapper/RightSideWrapper";

const AppLayout = () => {
  return (
    <GlobalWrapper>
      <Sidebar />
      <RightSideWrapper>
        <Header />
        <AppRoutes />
      </RightSideWrapper>
    </GlobalWrapper>
  );
};

const App = () => {
  return <AppLayout />;
};

export default App;
