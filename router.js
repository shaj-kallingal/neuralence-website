import { renderBlog } from "./renderBlog.js";

// Dynamically build blog routes
const blogRoutes = {
  blogdata: () => import("./blogData/blogdata.js"),
};

// Only load the blog if the blogId matches the URL hash
export function initRouter(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  async function loadBlog(blogId) {
    try {
      container.innerHTML = "<p>Loading...</p>";
      // Dynamically import the corresponding blog module
      const blogModule = await blogRoutes[blogId]?.();
      if (blogModule && blogModule.blogPost) {
        renderBlog(containerSelector, blogModule.blogPost);
      } else {
        container.innerHTML = "<p>Blog not found.</p>";
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      container.innerHTML = "<p>Error loading blog post.</p>";
    }
  }

  function handleRoute() {
    const hash = window.location.hash;
    const blogId = hash.replace("#", "") || "How smart design and AI are transforming modern businesses";
    

      blogRoutes[blogId] = () => import(`./blogData/${blogId}.js`);
    
    
    loadBlog(blogId);
  }

  window.addEventListener("hashchange", handleRoute);

  // Handle clicks on blog links
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && anchor.hash.includes("#/")) {
      e.preventDefault();
      const blogId = anchor.hash.split("#/")[1];
      window.location.hash = `#/${blogId}`;
    }
  });

  handleRoute();
}
