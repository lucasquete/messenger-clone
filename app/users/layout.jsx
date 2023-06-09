import getUsers from "../actions/getUsers"
import Sidebar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList";


const UserLayout = async ({ children }) => {
  
  const users = await getUsers();

  console.log(users);

  return (
    <Sidebar>      
        <div className="h-full">
          <UserList users={users}/>
          {children}
        </div>
    </Sidebar>
  )
}

export default UserLayout