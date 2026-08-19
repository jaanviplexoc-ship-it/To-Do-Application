import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
    <nav>
        <Link to="/TodoDashbord">Todo Dashboard</Link> | {" "}
        <Link to="/TodoForm">Todo Form</Link> | {" "}
        <Link to="/TodoList">Todo List</Link>
    </nav>
    </div>
  )
};

export default Navbar;