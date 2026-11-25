//components/action-card.js
export default function ActionCard() {
  return (
    <div className="mt-5 mx-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Subscribe</h3>

      {/* Input Field with Focus Effect */}
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Button with Hover State */}
      <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer">
        Sign up
      </button>
    </div>
  );
}
