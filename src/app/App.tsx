import { CardList } from "../CardList";
import { Example } from "../Example";
import { Navbar } from "../Navbar";
import { SubNavbar } from "../SubNavbar";

export const App = () => (
  <div className="flex h-screen w-full flex-col overflow-y-auto bg-blue-500">
    <Navbar />
    <CardList />
  </div>
);
