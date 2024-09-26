import { useEffect, useState } from "react";
import Button from "./Button";
import api from "../../api/index";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    };
  };

  const getUser = async () => {
    try {
      const endpoint = `/api/v1/user/bulk?filter=${filter}`;
      const response = await api.get(endpoint);
      setUsers(response?.data?.usersList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [filter]);

  const handleChange = (value) => {
    setFilter(value);
  };

  const debouncedFunc = debounce(handleChange, 500);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-4">
        <input
          type="text"
          name="searchUsers"
          onChange={(e) => {
            debouncedFunc(e.target.value);
          }}
          className="w-full px-2 py-1 border rounded border-slate-200 "
          placeholder="Search Users"
        />
      </div>
      <div>
        {users.map((user) => {
          return (
            <>
              <User key={user._id} user={user} />
            </>
          );
        })}
      </div>
    </>
  );
};
function User({ user }) {
  // ###### handle sendMoney
  const navigate = useNavigate();
  const handleSendMoney = () => {
    navigate(`/send?userId=${user._id}&user=${user.firstName}`);
  };
  return (
    <div className="flex justify-between items-center p-2 border-gray-300 border-2 my-2 rounded-xl">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onPress={handleSendMoney} label={"Send Money"} />
      </div>
    </div>
  );
}

export default Users;
