import { MdClose } from "react-icons/md";

const Modal = ({ children, title, onClose, show }) => {
  return (
    show && (
      <div className="bg-black/50 backdrop-blur-sm h-screen fixed w-full top-0 left-0">
        <div
          className="w-11/12 md:w-4/6 lg:w-3/6 shadow py-4 rounded-xl mx-auto bg-white absolute top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="flex justify-between px-4">
            <span className="text-2xl font-semibold">{title}</span>
            <MdClose size={20} onClick={onClose} className="cursor-pointer" />
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
