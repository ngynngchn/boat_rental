const url = import.meta.env.VITE_BACKEND;

export const getData = async (endpoint) => {
	try {
		const response = await fetch(url + endpoint);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
