import { FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleData, putUserData } from "../../helper/getEmp";
import { toast } from "react-toastify";
import { toggleChangeAction } from "../../redux/reducer";
import { BiEdit } from "react-icons/bi";

const UpdateForm = ({ formData, setFormData, formId }) => {
  const { isLoading, data, isError, error } = useQuery(["users", formId], () =>
    getSingleData(formId)
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const updateData = useMutation((newData) => putUserData(formId, newData), {
    onSuccess: (data) => {
      queryClient.setQueryData(["users", formId], data);
      queryClient.invalidateQueries("users");
      toast(<p className="text-yellow-500">Data updated Successfully</p>, {
        type: "warning",
        icon: <BiEdit size={25} className="text-yellow-500" />,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = Object.assign({}, data, formData);

    updateData.mutate(updated);
    dispatch(toggleChangeAction());
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error}</div>;

  const { name, email, salary, status } = data;
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 w-full"
    >
      <div className="m-3">
        <input
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          type="text"
          placeholder="Name"
          onChange={setFormData}
          name="name"
          defaultValue={name}
        />
      </div>
      <div className="m-3">
        <input
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          type="email"
          placeholder="Email"
          onChange={setFormData}
          name="email"
          defaultValue={email}
        />
      </div>
      <div className="m-3">
        <input
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          type="number"
          placeholder="Salary"
          onChange={setFormData}
          name="salary"
          defaultValue={salary}
        />
      </div>
      <div className="m-3">
        <select
          name="status"
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          onChange={setFormData}
          defaultValue={status}
        >
          <option value="" disabled={true}>
            Select Status
          </option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>
      <div className="m-3">
        <button className="bg-yellow-400 border border-yellow-400 text-white hover:text-yellow-400 hover:bg-gray-50 py-2 px-5 rounded flex">
          <FaUserEdit size={20} className="mr-2" />
          <span>Update</span>
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
