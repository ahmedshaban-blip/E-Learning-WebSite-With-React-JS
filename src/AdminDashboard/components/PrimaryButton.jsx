

function PrimaryButton({ children }) {
  return (
    <button
      className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;