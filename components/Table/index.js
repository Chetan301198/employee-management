import { BiEdit, BiTrash } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserData, getUserData } from "../../helper/getEmp";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  updateAction,
  toggleChangeAction,
  deleteAction,
} from "../../redux/reducer";
import { toast } from "react-toastify";

const Table = () => {
  const { isLoading, data, isError, error } = useQuery(["users"], getUserData);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [formId, deleteUser] = useSelector(
    (state) => [state.app.client.formId, state.app.client.deleteUser],
    shallowEqual
  );

  const deleteEmp = useMutation(() => deleteUserData(formId), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast(<p className="text-red-500 flex">Data Deleted Successfully</p>, {
        type: "error",
        icon: <BiTrash size={25} className="text-red-500" />,
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-16 py-2 text-gray-200">Name</th>
            <th className="px-16 py-2 text-gray-200">Email</th>
            <th className="px-16 py-2 text-gray-200">Salary</th>
            <th className="px-16 py-2 text-gray-200">Status</th>
            <th className="px-16 py-2 text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {data?.length > 0 &&
            data?.map((e) => (
              <>
                <Tr key={e._id} {...e} />
              </>
            ))}
        </tbody>
      </table>
      {data?.length <= 0 && (
        <p className="text-center text-xl my-10 w-full">No data found</p>
      )}
      {deleteUser && (
        <div className="bg-black/50 backdrop-blur-sm h-screen fixed w-full top-0 left-0">
          <div
            className="w-3/6 shadow py-8 rounded text-center mx-auto bg-white absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <h5 className="mb-3">Do you want to delete user?</h5>
            <div className="text-center">
              <button
                onClick={() => {
                  deleteEmp.mutate(formId);
                  dispatch(deleteAction());
                }}
                className="bg-green-500 border px-5 py-1 text-white rounded-full mx-3 hover:bg-gray-50 hover:text-green-500 hover:border-green-500"
              >
                Yes
              </button>
              <button
                onClick={() => dispatch(deleteAction())}
                className="bg-red-500 border px-5 py-1 text-white rounded-full mx-3 hover:bg-gray-50 hover:text-red-500 hover:border-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;

function Tr({ _id, name, email, salary, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  return (
    <tr className="bg-gray-100 text-center">
      <td className="py-2 px-16 capitalize">{name}</td>
      <td className="py-2 px-16">{email}</td>
      <td className="py-2 px-16">₹ {salary}</td>
      <td className="py-2 px-16">
        <button
          className={`${
            status === "active" ? "bg-green-500" : "bg-rose-500"
          } py-1 px-5 rounded-full text-white capitalize`}
        >
          {status}
        </button>
      </td>
      <td className="py-2 px-16 flex justify-around gap-5">
        <button className="text-blue-600" onClick={handleUpdate}>
          <BiEdit size={25} />
        </button>
        <button
          className="text-rose-500"
          onClick={() => {
            dispatch(updateAction(_id));
            dispatch(deleteAction());
          }}
        >
          <BiTrash size={25} />
        </button>
      </td>
    </tr>
  );
}
