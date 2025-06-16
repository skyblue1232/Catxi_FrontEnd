const InfoModal = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="z-500">
    <h2 className="text-lg font-bold">알림</h2>
    <p className="text-md mt-2">{message}</p>
    <div className="flex w-full mt-4">
      <button
        onClick={onClose}
        className="flex items-center justify-center w-full bg-[#424242] text-[#FAFAFA] px-[1.25rem] py-2 rounded-lg"
      >
        확인
      </button>
    </div>
  </div>
);

export default InfoModal;
