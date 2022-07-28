const GOOGLE_API_KEY = "AIzaSyBK5KNv74DHZQhLKOc6DWCzPfeTCt_Pfy8"; //INSERT YOUR API KEY

export let getMapPreview = (lat, lng) => {
    const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:P%7C${lat},${lng}&key=${GOOGLE_API_KEY}`; //&signature=YOUR_SIGNATURE`;

    return imagePreviewURL;
};

export let getAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch address!");
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;

    return address;
};
