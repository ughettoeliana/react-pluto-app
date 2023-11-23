export default function BaseInput({ id, type, name, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="max-w-sm bg-darkGrey rounded-xl py-2 px-3 my-2 text-white"
    />
  );
}
