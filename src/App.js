import News from "./components/news.js";
import React, { useState, useEffect } from "react";
import FilterButtons from "./components/filterButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {
  const defaultUrl =
    "https://bing-news-search1.p.rapidapi.com/news?&safeSearch=Off&textFormat=Raw";

  const [url, setUrl] = useState(defaultUrl);
  const [catButtons, setCatButtons] = useState([
    {
      id: 1,
      category: "economia",
      isPressed: false,
      catUrl:
        "https://bing-news-search1.p.rapidapi.com/news/search?q=Econom%C3%ADa%20digital&count=22&freshness=Day&textFormat=Raw&safeSearch=Off",
    },
    {
      id: 2,
      category: "entretenimiento",
      isPressed: false,
      catUrl:
        "https://bing-news-search1.p.rapidapi.com/news/search?q=Entretenimiento&count=22&freshness=Day&textFormat=Raw&safeSearch=Off",
    },
    {
      id: 3,
      category: "negocios",
      isPressed: false,
      catUrl:
        "https://bing-news-search1.p.rapidapi.com/news/search?q=Negocios&count=22&freshness=Day&textFormat=Raw&safeSearch=Off",
    },
  ]);

  useEffect(() => {
    let selectedCategory = catButtons.find(
      (button) => button.isPressed === true
    );

    setUrl((oldUrl) => {
      return oldUrl = catButtons.every((filter) => filter.isPressed === false)
        ? defaultUrl
        : selectedCategory.catUrl;
    });
  }, [catButtons]);

  function setFilter(id) {
    setCatButtons((oldButtons) =>
      oldButtons.map((button) => {
        return button.id === id
          ? { ...button, isPressed: !button.isPressed }
          : { ...button, isPressed: false };
      })
    );
  }

  const filterButtons = catButtons.map((button) => (
    <FilterButtons
      key={button.id}
      id={button.id}
      value={button.category}
      isPressed={button.isPressed}
      setFilter={setFilter}
      icon={button.icon}
    />
  ));

  return (
    <div className="w-full bg-gray-50">
      <div
        className="header w-screen h-[80px] z-index[10]
       drop-shadow-md mb-14  bg-white mt-2 flex items-center sticky-header"
      >
        <FontAwesomeIcon
          className="justify-self-start w-14 h-14 p-5"
          icon={solid("globe")}
        />
        <h1 className="font-serif page-title ml-20 text-9xl font-bold text-black ">
          The News
        </h1>
      </div>

      <div className="filter-buttons mx-16 mb-14 flex flex-row-reverse">
        {filterButtons}
      </div>

      <News url={url} />
      <footer className="footer mx-28 mt-16 w-auto border-t border-slate-300 p-20 h-48 divide-x-8 divide-y-reverse divide-solid flex justify-center text-slate-500 ">
        <p>Copyright © 2023 Arturo Hernandez Moreno.</p>
      </footer>
    </div>
  );
}

export default App;
