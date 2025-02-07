
const ModelDropdown = ({selectedModel, setSelectedModel }) => {
  const models = process.env.REACT_APP_API_model?.split(",") || [];
  const handleChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
  };

  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700">Select Model</label>
      <select
        value={selectedModel}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
      >
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelDropdown;