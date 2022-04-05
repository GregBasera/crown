export default function TextInput({ type, value, onChange, indx, dbID }) {
  return (
    // <div className="m-2">
    // <div className="mt-1 relative rounded-md">
    <input
      className="border border-gray focus:outline-none block w-full px-3 py-1 rounded-md"
      type={type}
      value={value}
      onChange={() => onChange(event, indx, dbID)}
    />
    // </div>
    // </div>
  );
}
