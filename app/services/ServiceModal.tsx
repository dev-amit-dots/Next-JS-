type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: string;
  fullDescription:string;
  
};

export default function ServiceModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  fullDescription
  
}: ServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-xl rounded-xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <p className="text-gray-600 overflow-y-auto max-h-100" >{description}</p>
            <p className="text-gray-600 mt-4 overflow-y-auto max-h-100">{fullDescription}</p>
      </div>
    </div>
  );
}
