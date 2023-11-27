export default function BaseInput({
  id,
  type,
  name,
  value,
  onChange,
  className = "",
}) {

  const defaultClasses =
    "max-w-sm bg-darkGrey rounded-xl py-2 px-3 my-2 text-white";
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`${defaultClasses}${className}`}
    />
  );
}
