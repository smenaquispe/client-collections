export function Action({ routeAction, actionName, formKeys, description, setResult, setError, setLoading }) {
    
    const handleClick = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = {};
        for (const input of form) {
            if (input.name) {
                data[input.name] = input.value;
            }
        }

        let method = "POST";
        if (Object.keys(data).length === 0) {
            method = "GET";
        }

        const URI_BACKEND = import.meta.env.VITE_URI_BACKEND;
        setLoading(true);
        fetch(`${URI_BACKEND}/${routeAction}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: method === "POST" ? JSON.stringify(data) : null,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            setResult(data);
            setError(null);
        })
        .catch(error => {
            setLoading(false);
            setResult(null);
            setError(error);
        });
    };
    
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{actionName}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <form className="space-y-4">
                {formKeys.map((key) => (
                    <input
                        key={key}
                        name={key}
                        placeholder={key}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                ))}
                <button
                    onClick={handleClick}
                    className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
