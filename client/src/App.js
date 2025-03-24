import React from "react";
import KakaoMap from "./components/Map";

const Header = () => {
  return (
    <header className="w-full py-6 bg-gradient-to-r from-blue-500 to-green-400 shadow-md">
      <h1 className="text-white text-3xl font-bold text-center">Our Meeting Guide</h1>
    </header>
  );
};

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder="주소, 역 이름, 건물명 입력"
        className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
      />
      <button className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md
                        transition-transform transform hover:scale-105 active:scale-95 hover:bg-blue-600">
        검색
      </button>
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md 
                        transition-transform transform hover:scale-105 active:scale-95 hover:bg-green-600">
        모임 추천 위치 보기
      </button>
      <button className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md
                        transition-transform transform hover:scale-105 active:scale-95 hover:bg-gray-600">
        초기화
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar />
      <Buttons /> {/* ✅ 버튼은 여기 한 번만! */}
      <KakaoMap /> {/* ✅ 지도는 아래쪽에 유지 */}
    </div>
  );
};

export default App;
