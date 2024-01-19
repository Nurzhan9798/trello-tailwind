import { Board } from "../Board";
import { Navbar } from "../Navbar";

export const App = () => (
  <div className="flex h-screen w-full flex-col overflow-y-auto bg-blue-500">
    <Navbar />
    <Board />
  </div>
);
