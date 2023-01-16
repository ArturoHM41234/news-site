import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function News(props) {
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const localDateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "be291c1a22mshe654708e187b7d5p11f00bjsn74fa17b335a8",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };

      const response = await fetch(props.url, options);
      const data = await response.json();
      setNewsItems(data.value);
      setLoading(false);
    };
    loadNews();
  }, [props.url]);

  console.log(newsItems)
  //render every new into a component
  const newsElements = newsItems.map((item, index) => {
    return (
      <div
        key={index}
        className="news-card hover:opacity-60 duration-300 flex justify-center hover:cursor-pointer w-[450px] h-auto"
      >
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col rounded-lg shadow-lg bg-white"
        >
          <div className="card-top-container flex justify-left p-4 items-center">
            <img
              className="w-28 h-28 rounded-lg card-image"
              src={item.image?.thumbnail.contentUrl}
              alt=""
            />
            <h5 className="card-title text-gray-900 hover:underline text-xl font-medium mb-2 justify-self-center px-5">
              {item.name}
            </h5>
          </div>
          <div className="px-6 py-3 border-t border-slate-300 mx-6 my-3">
            <p className="text-gray-700 text-base mb-4 h-[45px] overflow-hidden">
              {item.description}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-left p-3 text-gray-500 mt-auto mb-1">
              <FontAwesomeIcon className="pr-2" icon={solid("calendar-days")} />
              {new Date(item.datePublished).toLocaleDateString(
                "es-MX",
                localDateOptions
              )}
            </p>
            <p className="ml-auto mr-4 h-10 text-gray-500 flex items-center">
              <img
                className="w-4 h-4 mr-3"
                src={item.provider[0].image?.thumbnail.contentUrl}
                alt="_"
              />
              {item.provider[0].name}
            </p>
          </div>
        </a>
      </div>
    );
  });

  return (
    <div className="news-container grid gap-10 grid-cols-3  grid-rows-3 place-items-center">
      {loading ? <h4>Loading...</h4> : newsElements}
    </div>
  );
}
