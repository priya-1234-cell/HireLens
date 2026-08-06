function Button({ text, bg = "bg-cyan-500", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${bg} px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300`}
    >
      {text}
    </button>
  );
}

export default Button;