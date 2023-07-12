import { HiUserAdd } from "react-icons/hi";
import Form from "../components/Form";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
import Modal from "../components/Modal";
export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(toggleChangeAction());
  };
  const formId = useSelector((state) => state.app.client.formId);
  return (
    <section className="container mx-auto py-5">
      <h1 className="text-2xl md:text-5xl text-center font-bold py-10">
        Employee Management
      </h1>
      <div className="shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-white rounded-xl py-4">
        <div className="flex justify-between pt-2 pb-6 px-4">
          <div className="left flex gap-3">
            <button
              onClick={handleAdd}
              className="flex bg-blue-500 py-2 px-4 border rounded-md text-white hover:bg-gray-50 hover:text-blue-500 hover:border-blue-500"
            >
              <HiUserAdd size={25} className="mr-2" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
        <Modal
          show={visible}
          onClose={handleAdd}
          title={`${formId ? "Update" : "Add"} Employee`}
        >
          <Form />
        </Modal>
        <div>
          <Table />
        </div>
      </div>
    </section>
  );
}
