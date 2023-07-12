import { FaUserPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUserData } from "../../helper/getEmp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "../../redux/reducer";

const AddForm = ({ formData, setFormData }) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const addData = useMutation(postUserData, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast(<p className="text-green-500">Data Added Successfully</p>, {
        type: "success",
        icon: <FaUserPlus size={20} className="text-green-500" />,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return toast("Please Fill The Form", { type: "default" });
    }
    let { name, email, salary, status } = formData;
    const model = {
      name,
      email,
      salary,
      status: status ?? "active",
    };

    addData.mutate(model);
    dispatch(toggleChangeAction());
  };

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
        />
      </div>
      <div className="m-3">
        <input
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          type="email"
          placeholder="Email"
          onChange={setFormData}
          name="email"
        />
      </div>
      <div className="m-3">
        <input
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          type="number"
          placeholder="Salary"
          onChange={setFormData}
          name="salary"
        />
      </div>
      <div className="m-3">
        <select
          name="status"
          className="block border border-gray-400 rounded p-2 w-full focus:outline-blue-600"
          onChange={setFormData}
        >
          <option>Select Status</option>
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>
      <div className="m-3">
        <button className="bg-green-500 border border-green-500 hover:bg-gray-50 text-white hover:text-green-500 py-2 px-5 rounded flex">
          <FaUserPlus size={20} className="mr-2" />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default AddForm;
