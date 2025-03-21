// client/src/components/LocationInput.js
import React, { useState } from "react";

const LocationInput = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch(query);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="주소, 역 이름, 건물명 입력"
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default LocationInput;
