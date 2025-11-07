
  export const blogs = [
    {
      date: "19 May 2025",
      title: "How smart design and AI are transforming modern businesses?",
      image: "images/Blogs/Thumb/how-ui-ux-design-drives-business-transformation-thumb.webp",
      link: "blogs.html#How smart design and AI are transforming modern businesses"
    },
    {
      date: "18 May 2025",
      title: "Using AI to Automate Business Processes and Scale Faster",
      image: "images/Blogs/Thumb/using-ai-to-automate-business-processes-and-scale_thumb.webp",
      link: "blogs.html#Using AI to Automate Business Processes and Scale Faster"
    },
    {
      date: "18 May 2025",
      title: "The Role of KPIs in Driving Design and Product Decisions: A Practical Guide for Business Growth",
      image: "images/Blogs/Thumb/role-of-kpis-in-driving-design-and-product-decisions-thumb.webp",
      link: "blogs.html#The Role of KPIs in Driving Design and Product Decisions - A Practical Guide for Business Growth"
    },
    {
      date: "18 May 2025",
      title: "From Chaos to Clarity: Building Scalable Digital Processes",
      image: "images/Blogs/Thumb/from-chaos-to-clarity-building-scalable-digital-processes_thumb.webp",
      link: "blogs.html#From Chaos to Clarity - Building Scalable Digital Processes"
    },
    {
      date: "19 May 2025",
      title: "Top 5 AI Tools Every Digital Business Should Use in 2025",
      image: "images/Blogs/Thumb/top-ai--tools-every-digital-business-should-use-thumb.webp",
      link: "blogs.html#Top 5 AI Tools Every Digital Business Should Use in 2025"
    },
    {
      date: "18 May 2025",
      title: "Measuring What Matters: UX KPIs That Impact Your Bottom Line",
      image: "images/Blogs/Thumb/measuring-what-matters-ux-kpis-that-impact-your-bottom-line-thumb.webp",
      link: "blogs.html#Measuring What Matters - UX KPIs That Impact Your Bottom Line"
    },
    {
      date: "18 May 2025",
      title: "Design Thinking Meets Data: How to Build Smarter Products",
      image: "images/Blogs/Thumb/design-thinking-meets-data-how-to-build-smarter-products-thumb.webp",
      link: "blogs.html#Design Thinking Meets Data - How to Build Smarter Products"
    },
    
    {
      date: "18 May 2025",
      title: "Why a Design System Is Crucial for Business Consistency and Scalable Product Development",
      image: "images/Blogs/Thumb/why-a-design-system-is-crucial-for-business-consistency-thumb.webp",
      link: "blogs.html#Why a Design System Is Crucial for Business Consistency and Scalable Product Development"
    },
    {
      date: "18 May 2025",
      title: "Bridging the Great Divide : Where Tech Meets Strategy in Digital Projects",
      image: "images/Blogs/Thumb/bridging-the-gap-between-tech-and-strategy-in-digital-projects-thumb.webp",
      link: "blogs.html#Bridging the Great Divide - Where Tech Meets Strategy in Digital Projects"
    },
    {
      date: "13 May 2025",
      title: "Human-Centered AI : Designing Ethical, Smart, and Scalable Product",
      image: "images/Blogs/Thumb/human-centered-ai-designing-ethical-smart-and-scalable-products-thumb.webp",
      link: "blogs.html#Human-Centered AI - Designing Ethical, Smart, and Scalable Product"
    },
  ];




  const blogsPerPage = 9;
  let currentPage = 1;

  function formatDate(dateStr) {
    const [day, monthStr, year] = dateStr.split(" ");
    return new Date(`${monthStr} ${day}, ${year}`);
  }

  // Sort blogs by date descending
  blogs.sort((a, b) => formatDate(b.date) - formatDate(a.date));

  export const renderBlogs = function renderBlogs(page = 1) {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = "";

    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const pageBlogs = blogs.slice(start, end);

    pageBlogs.forEach((blog, index) => {
      const delay = (0.25 + index * 0.25).toFixed(2);
      blogList.innerHTML += `
        <div class="col-lg-4 col-md-6">
          <div class="blog-item wow fadeInUp" data-wow-delay="${delay}s">
            <div class="post-featured-image">
              <figure class="image-anime">
                <a href="${blog.link}"><img src="${blog.image}" alt="${blog.title}"></a>
              </figure>
            </div>
            <div class="post-item-body">
              <p><a href="${blog.link}">${blog.date}</a></p>
              <h2><a href="${blog.link}">${blog.title}</a></h2>
            </div>
          </div>
        </div>
      `;
    });

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const paginationContainer = document.querySelector(".post-pagination .pagination");
  
    paginationContainer.innerHTML = "";
  
    if (currentPage > 1) {
      const prev = document.createElement("li");
    
      const a = document.createElement("a");
    
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-arrow-left-long";
      icon.style.color = "white";
    
      // Hover effect
      a.onmouseenter = () => {
        icon.style.color = "#5987ed";
        a.style.backgroundColor = "white";
      };
    
      a.onmouseleave = () => {
        icon.style.color = "white";
        a.style.backgroundColor = "";
      };
    
      a.addEventListener("click", () => changePage(currentPage - 1));
    
      a.appendChild(icon);
      prev.appendChild(a);
      paginationContainer.appendChild(prev);
    }
    
  
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = i === currentPage ? "active" : "";
    
      const a = document.createElement("a");
      a.textContent = i;
    
      // Set initial color
      const isActive = i === currentPage;
      a.style.color = isActive ? "#5987ed" : "white";
    
      // Hover effect - switch colors
      a.onmouseenter = () => {
        a.style.color = isActive ? "white" : "#5987ed";
        a.style.backgroundColor = isActive ? "#5987ed" : "white";
      };
      a.onmouseleave = () => {
        a.style.color = isActive ? "#5987ed" : "white";
        a.style.backgroundColor = isActive ? "white" : "#5987ed";
      };
    
      a.addEventListener("click", () => changePage(i));
    
      li.appendChild(a);
      paginationContainer.appendChild(li);
    }
    
    
  
    if (currentPage < totalPages) {
      const next = document.createElement("li");
    
      const a = document.createElement("a");
    
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-arrow-right-long";
      icon.style.color = "white";
    
      // Hover effect
      a.onmouseenter = () => {
        icon.style.color = "#5987ed";
        a.style.backgroundColor = "white";
      };
    
      a.onmouseleave = () => {
        icon.style.color = "white";
        a.style.backgroundColor = "";
      };
    
      a.addEventListener("click", () => changePage(currentPage + 1));
    
      a.appendChild(icon);
      next.appendChild(a);
      paginationContainer.appendChild(next);
    }
    
  }
  
  

 

  function changePage(page) {
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    window.scrollTo(0,800)
    renderBlogs(page);
  }

 

 
