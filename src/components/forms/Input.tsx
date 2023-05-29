interface InputProps {
  type: string;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const { type, placeholder } = props;
  return (
    <input
      type={type}
      className="bg-gray-50 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-600"
      placeholder={placeholder}
    />
  );
}
