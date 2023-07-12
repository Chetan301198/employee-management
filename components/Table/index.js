import { BiEdit, BiTrash } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserData,
  getUserData,
  getSingleData,
} from "../../helper/getEmp";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  updateAction,
  toggleChangeAction,
  deleteAction,
} from "../../redux/reducer";
import { toast } from "react-toastify";
import Modal from "../Modal";
import { useState } from "react";
import moment from "moment";

const Table = () => {
  const { isLoading, data } = useQuery(["users"], getUserData);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [formId, deleteUser] = useSelector(
    (state) => [state.app.client.formId, state.app.client.deleteUser],
    shallowEqual
  );

  const deleteEmp = useMutation(() => deleteUserData(formId), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast(<p>Data Deleted Successfully</p>, {
        type: "error",
        icon: <BiTrash size={25} className="text-red-500" />,
      });
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 lg:px-8 py-3 text-gray-800">Name</th>
            <th className="px-8 py-3 text-gray-800 hidden lg:table-cell">
              Email
            </th>
            <th className="px-8 py-3 text-gray-800 hidden lg:table-cell">
              Salary
            </th>
            <th className="px-8 py-3 text-gray-800 hidden lg:table-cell">
              Status
            </th>
            <th className="px-8 py-3 text-gray-800 hidden lg:table-cell">
              Joining
            </th>
            <th className="px-4 lg:px-8 py-3 text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.length > 0 &&
            data?.map((e) => <Tr key={e._id} {...e} />)}
        </tbody>
      </table>
      {!data && data?.length <= 0 && (
        <p className="text-center text-xl my-10 w-full">No data found</p>
      )}

      <Modal show={deleteUser} onClose={() => dispatch(deleteAction())}>
        <h5 className="mb-3 text-center">Do you want to delete user?</h5>
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
      </Modal>
    </>
  );
};

export default Table;

const Tr = ({ _id, name, email, salary, status, createdAt }) => {
  const [visible, formId] = useSelector((state) => [
    state.app.client.toggleForm,
    state.app.client.formId,
  ]);

  const [detailModal, setDetailModal] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(["users", formId], () =>
    getSingleData(formId)
  );

  const handleUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  return (
    <>
      <tr className="text-center hover:shadow-lg border-b border-gray-200">
        <td
          className="py-3 px-4 lg:px-8 capitalize cursor-pointer"
          onClick={() => {
            dispatch(updateAction(_id));
            setDetailModal(true);
          }}
        >
          {name}
        </td>
        <td className="py-3 px-8 hidden lg:table-cell">{email}</td>
        <td className="py-3 px-8 hidden lg:table-cell">₹ {salary}</td>
        <td className="py-3 px-8 hidden lg:table-cell">
          <button
            className={`${
              status === "active" ? "bg-green-500" : "bg-rose-500"
            } py-1 px-5 rounded-full text-white capitalize w-full`}
          >
            {status}
          </button>
        </td>
        <td className="py-3 px-8 hidden lg:table-cell">
          {moment(createdAt).format("DD-MM-YYYY")}
        </td>
        <td className="py-3 px-4 lg:px-8 flex justify-center gap-2">
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
      <Modal
        title={"Employee Details"}
        show={detailModal}
        onClose={() => setDetailModal(false)}
      >
        <div className="px-4 py-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-lg capitalize">
                    <b>Name:</b> {data.name}
                  </div>
                  <div className="text-lg">
                    <b>Email:</b> {data.email}
                  </div>
                  <div className="text-lg">
                    <b>Salary:</b> {data.salary}
                  </div>
                  <div className="text-lg">
                    <b>Status:</b>{" "}
                    <span
                      className={`${
                        data.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      } capitalize`}
                    >
                      {data.status}
                    </span>
                  </div>
                  <div className="text-lg">
                    <b>Joining Date:</b>{" "}
                    {moment(data?.createdAt).format("DD-MM-YYYY")}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Modal>
    </>
  );
};
