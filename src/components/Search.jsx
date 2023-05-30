import Fuse from "fuse.js";
import { useState } from "react";

// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
 keys: ["data.title", "data.desc", "slug", "data.category"],
 includeMatches: true,
 minMatchCharLength: 2,
 threshold: 0.5,
};

function Search({ searchList }) {
 // User's input
 const [query, setQuery] = useState("");

 const fuse = new Fuse(searchList, options);

 // Set a limit to the posts: 5
 const posts = fuse
  .search(query)
  .map((result) => result.item)
  .slice(0, 6);

 function handleOnSearch({ target = {} }) {
  const { value } = target;
  setQuery(value);
 }

 return (
  <>
   <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <svg
      aria-hidden="true"
      className="w-5 h-5 text-gray-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
     >
      <path
       fillRule="evenodd"
       d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
       clipRule="evenodd"
      ></path>
     </svg>
    </div>
    <input
     type="text"
     value={query}
     className="box text-[16px] w-full rounded-[15px] block pl-[40px] pr-[15px] py-[10px]"
     onChange={handleOnSearch}
     placeholder="Поиск постов..."
    />
    <ul className="z-10 empty:bg-transparent bg-zinc-100 empty:border-[0px] border-[1px] border-gray-200 empty:p-0 p-[20px] absolute flex flex-col gap-[10px] left-0 top-[60px] w-full overflow-auto rounded-[15px]">
     {query.length > 1 && (
      <p className="font-medium">
       📊 {posts.length === 1 ? "Найден" : "Найдено"} {posts.length}{" "}
       {posts.length === 1 ? "пост" : "поста"}
      </p>
     )}

     {posts &&
      posts.map((post) => (
       <a href={`/posts/${post.slug}`}>
        <li className="rounded-[15px] bg-white p-[15px]">
         <h3 className="text-[16px] font-bold">🔗 {post.data.title}</h3>
         <span className="text-[14px] bg-yellow-200">#{post.data.category}</span>
         <p className="text-[14px] line-clamp-3">{post.data.desc}</p>
        </li>
       </a>
      ))}
    </ul>
   </div>
  </>
 );
}

export default Search;
