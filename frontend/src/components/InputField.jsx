export default function InputField({ label, type, value, onChange, name }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}   
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}