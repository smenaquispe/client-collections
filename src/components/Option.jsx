export function Option({ label, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full py-2 mb-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {label}
      </button>
    );
  }
  