import { Board } from "widgets/Board";
import { Navbar } from "widgets/Navbar";

export const App = () => (
  <div className="flex h-screen w-full flex-col overflow-y-auto bg-blue-500">
    <Navbar />
    <Board />
  </div>
);
