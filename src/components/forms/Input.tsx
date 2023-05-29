interface InputProps {
  type: string;
  register: any;
  id: string
}

export default function Input(props: InputProps) {
  const { type, id , register} = props;
  return (
    <input
      type={type}
      {...register(id)}
      className="bg-gray-50 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-600"
    />
  );
}
