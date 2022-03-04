
import { useState } from "react";
import PostCard from "../components/postcard";
import { getAllPosts } from "../lib/api";

export default function Home({ posts = [] }) {
 
  const [qty, setQty] = useState(2);

  const [filtered, setFilter] = useState("");

  return (
    <div>
      <div className="blog">
        <div className="blog__content container">
          <div className="blog__content--filter text-center">
            <span className="filter">
              <button
                onClick={() => setFilter("")}
                className={filtered === "" ? "btn btn-active" : "btn "}
              >
                All
              </button>
            </span>
            <span className="filter">
              <button
                onClick={() => setFilter("business")}
                className={filtered === "business" ? "btn btn-active" : "btn "}
              >
                Business
              </button>
            </span>
            <span className="filter">
              <button
                onClick={() => setFilter("entertaiment")}
                className={
                  filtered === "entertaiment" ? "btn btn-active" : "btn "
                }
              >
                Entertaiment
              </button>
            </span>
            <span className="filter">
              <button
                onClick={() => setFilter("lifestyle")}
                className={filtered === "lifestyle" ? "btn btn-active" : "btn "}
              >
                LifeStyle
              </button>
            </span>
            <span className="filter">
              <button
                onClick={() => setFilter("technology")}
                className={
                  filtered === "technology" ? "btn btn-active" : "btn "
                }
              >
                Technology
              </button>
            </span>
            <span className="filter">
              <button
                onClick={() => setFilter("other")}
                className={filtered === "other" ? "btn btn-active" : "btn "}
              >
                Other
              </button>
            </span>
          </div>
          <div className="blog__content--posts grid grid-3">
            {posts.map((post, i) => (
              <PostCard post={post} img={post.image} key={i} />
            ))}
          </div>
          <div className="blog__button text-center">
            {posts.length <= qty + 1 ? (
              ""
            ) : (
              <button className="btn" onClick={() => setQty(qty + 3)}>
                Load more...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
