function el(tag, className = "", text = "") {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
}

console.log('start')

import { blogs } from './blogData/blogpages.js';

console.log('hereee ', blogs)

function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

export function renderBlog(containerSelector, blogPost) {

    try {

        function formatDate(dateStr) {
            const [day, monthStr, year] = dateStr.split(" ");
            return new Date(`${monthStr} ${day}, ${year}`);
        }


        console.log(blogs)
        const latestBlogs = blogs
            .slice() // clone to avoid modifying original
            .sort((a, b) => formatDate(b.date) - formatDate(a.date)) // sort by latest
            .slice(0, 4); // get latest 4

        console.log(latestBlogs)

        blogPost.sidebar.recentPosts = latestBlogs.map(blog => ({
            image: blog.image,
            date: blog.date,
            title: blog.title,
            href: blog.link
        }));
    } catch (error) {
        console.log(error)
    }


    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = ""; // Clear container

    // Wrap everything in a Bootstrap container
    const mainContainer = el("div", "container");

    // First Row: Header
    const headerRow = el("div", "row");
    const headerCol = el("div", "col-lg-12");
    const header = el("div", "blog-details-overly-item bg-cover ");
    header.style.backgroundImage = `url(${blogPost.headerImage})`;
    header.innerHTML = `
      <div class="heading1-w">
        <div class="social-area mb-16">
          <div class="author-area">
            <div class="author">
              <div class="author-tumb">
                <img src="${blogPost.author.avatar}" alt="${sanitizeHTML(blogPost.author.name)}'s avatar" />
              </div>
              <a  class="author-text">${sanitizeHTML(blogPost.author.name)}</a>
            </div>
            <div class="date">
              <a><img src="images/icons/date1.svg" alt="Date icon" /> ${sanitizeHTML(blogPost.author.date)}</a>
            </div>
          </div>
          <a " class="time"><img src="images/icons/time1.svg" alt="Time icon" /> ${sanitizeHTML(blogPost.author.readTime)}</a>
        </div>
        <div class="row">
          <div class="col-lg-10">
            <h2>${sanitizeHTML(blogPost.author.title)}</h2>
            <p class="mt-16">${sanitizeHTML(blogPost.author.description)}</p>
          </div>
        </div>
      </div>
    `;
    headerCol.append(header);
    headerRow.append(headerCol);
    mainContainer.append(headerRow);

    // Second Row: Blog Content and Sidebar
    const contentRow = el("div", "row");

    // col-lg-8: Blog Sections
    const contentCol = el("div", "col-lg-8");
    const detailsArea = el("div", "details content-area mt-40");

    blogPost.sections.forEach((sec) => {
        const art = el("article");
        const marginClass = sec.margin === "50" ? "mt-50" : "mt-40";
        const wrap = el("div", `heading1 ${marginClass}`);

        if (sec.title || sec.heading) {
            const h = el("h3", "mt-40", sec.title || sec.heading);
            wrap.append(h);
        }

        if (sec.paragraphs) {
            sec.paragraphs.forEach(pText => {
                const p = el("p", "mt-16", pText);
                wrap.append(p);
            });
        }

        if (sec.points) {
            sec.points.forEach(pt => {
                const p = el("p", "mt-10 p-with-span");
                p.innerHTML = `<span><strong>${sanitizeHTML(pt.label)}</strong></span> ${sanitizeHTML(pt.text)}`;
                wrap.append(p);
            });
            if (sec.conclusion) {
                wrap.append(el("p", "mt-20", sec.conclusion));
            }
        }

        if (sec.images) {
            const row = el("div", "row");
            sec.images.forEach((src, index) => {
                const col = el("div", "col-md-6");
                const imgWrap = el("div", "image _relative image-anime mt-40");
                const img = el("img", "w-full");
                img.src = src;
                img.alt = `Blog image ${index + 1}`;
                imgWrap.append(img);
                col.append(imgWrap);
                row.append(col);
            });
            wrap.append(row);
        }

        if (sec.type === "quote") {
            const quoteDiv = el("div", "clint-review");
            const quoteImg = el("img");
            quoteImg.src = "images/icon-blockquote.svg";
            quoteImg.alt = "Quote icon";
            const quoteText = el("p", "", sec.quote);
            const authorText = el("span", "", sec.author);
            quoteDiv.append(quoteImg, quoteText, authorText);
            art.append(quoteDiv);
        }

        if (sec.type === "form") {
            const formArea = el("div", "details-contact-area");
            const formHeading = el("div", "heading1");
            formHeading.append(el("h5", "", sec.formTitle || "Leave a Reply"));
            formHeading.append(el("p", "mt-10", sec.formDescription || "Provide clear contact information."));
            formArea.append(formHeading);

            const form = el("form");
            form.action = sec.formAction || "#";
            const formRow = el("div", "row");
            const inputs = [
                { type: "text", placeholder: "First Name", colClass: "col-md-6" },
                { type: "text", placeholder: "Last Name", colClass: "col-md-6" },
                { type: "email", placeholder: "Email", colClass: "col-md-6" },
                { type: "number", placeholder: "Phone", colClass: "col-md-6" },
                { type: "text", placeholder: "Subject", colClass: "col-md-12" }
            ];

            inputs.forEach(input => {
                const col = el("div", input.colClass);
                const inputWrap = el("div", "single-input");
                const inputEl = el("input");
                inputEl.type = input.type;
                inputEl.placeholder = input.placeholder;
                inputWrap.append(inputEl);
                col.append(inputWrap);
                formRow.append(col);
            });

            const textareaCol = el("div", "col-md-12");
            const textareaWrap = el("div", "single-input");
            const textarea = el("textarea");
            textarea.rows = 5;
            textarea.placeholder = "Message";
            textareaWrap.append(textarea);
            textareaCol.append(textareaWrap);
            formRow.append(textareaCol);

            const buttonCol = el("div", "col-md-12");
            const buttonWrap = el("div", "button mt-30");
            const button = el("button", "theme-btn1");
            button.type = "submit";
            button.className = "btn-default";
            button.textContent = "Send A Message";
            buttonWrap.append(button);
            buttonCol.append(buttonWrap);
            formRow.append(buttonCol);

            form.append(formRow);
            formArea.append(form);
            art.append(formArea);
        }

        art.append(wrap);
        detailsArea.append(art);
    });

    contentCol.append(detailsArea);
    contentRow.append(contentCol);

    // col-lg-4: Sidebar
    const sidebarCol = el("div", "col-lg-4");
    const sidebarArea = el("div", "blog1-sidebar-area mt-40 ml-30 sm:ml-0 md:ml-0 md:mt-30 sm:mt-30");

    const authorWidget = el("div", "sidebar-details-widget_1 _author-intro mt-40");
    const authorThumb = el("div", "sidebar-author-thumb text-center");
    const authorImg = el("img");
    authorImg.src = blogPost.sidebar?.author?.image || "images/blog/sidebar-author1.png";
    authorImg.style.width = "150px";  // You can adjust size
    authorImg.style.height = "150px";
    authorImg.style.objectFit = "cover";
    authorImg.style.borderRadius = "50%"; // Make it round
    authorImg.style.display = "block";
    authorImg.style.margin = "0 auto"; // Center image
    authorImg.alt = sanitizeHTML(blogPost.sidebar?.author?.name) || "Author avatar";
    const authorName = el("h4", "", blogPost.sidebar?.author?.name || "Jerry Helfer");
    const authorDesc = el("div", "heading1");
    authorDesc.append(el("p", "", blogPost.sidebar?.author?.description || "Whether you’re a tech enthusiast or a business leader..."));
    const socialArea = el("div", "footer-social1");
    const socialList = el("ul");
    const socialIcons = [
        { icon: "fa-brands fa-facebook-f", href: "" },
        { icon: "fa-brands fa-linkedin-in", href: "" },
        { icon: "fa-brands fa-instagram", href: "" },
        { icon: "fa-brands fa-behance", href: "" }
    ];
    socialIcons.forEach(icon => {
        const li = el("li");
        const a = el("a");
        a.href = icon.href;
        a.className = "social-icon";
        a.innerHTML = `<i class="${icon.icon}"></i>`;
        li.append(a);
        socialList.append(li);
    });
    socialArea.append(socialList);
    authorThumb.append(authorImg, authorName, authorDesc, socialArea);
    authorWidget.append(authorThumb);

    const recentWidget = el("div", "sidebar-details-widget_1 _recent-posts mt-40");
    recentWidget.append(el("h3", "", "Recent Post"));
    (blogPost.sidebar?.recentPosts || [
        { image: "images/blog/blog1-recent1.png", date: "Oct 13, 2024", title: "The Power of Storytelling...", href: "blog-single.html" },
        { image: "images/blog/blog1-recent2.png", date: "Oct 12, 2024", title: "Mastering Content Calendars...", href: "blog-single.html" },
        { image: "images/blog/blog1-recent3.png", date: "Oct 21, 2024", title: "Social Media Trends for 2024...", href: "blog-single.html" },
        { image: "images/blog/blog1-recent4.png", date: "Oct 19, 2024", title: "Creating a Visual Identity...", href: "blog-single.html" }
    ]).forEach((post, index) => {
        const recentBox = el("div", `blog1-recent-box ${index > 0 ? "mt-16" : ""}`);
        const thumbWrap = el("div", "");
        const thumb = el("div", "recent-thumb");
        const img = el("img");

        // Set image source and alt text
        img.src = post.image;
        img.alt = `Recent post ${index + 1}`;

        // Apply the inline CSS for border-radius and cropping
        img.style.objectFit = "cover"; // Ensures the image is cropped to fill the container
        img.style.borderRadius = "12px"; // Rounded corners
        img.style.width = "80px"; // Make the image width 100% of its container
        img.style.height = "80px"; // Make the image height 100% of its container
        img.style.maxWidth = "200px"; // Set the max width (optional, based on your design)
        img.style.maxHeight = "200px"; // Set the max height (optional, based on your design)

        thumb.append(img);
        thumbWrap.append(thumb);

        const heading = el("div", "heading");
        const dateLink = el("a", "date");
        dateLink.href = post.href;
        dateLink.innerHTML = `<img src="images/icons/date1.svg" alt="Date icon" /> ${sanitizeHTML(post.date)}`;
        const title = el("h5");
        const titleLink = el("a");
        titleLink.href = post.href;
        titleLink.textContent = post.title;
        title.append(titleLink);
        heading.append(dateLink, title);

        recentBox.append(thumbWrap, heading);
        recentWidget.append(recentBox);
    });
    ;

    sidebarArea.append(recentWidget);
    sidebarArea.append(authorWidget);

    sidebarCol.append(sidebarArea);
    contentRow.append(sidebarCol);

    mainContainer.append(contentRow);
    container.append(mainContainer);
}