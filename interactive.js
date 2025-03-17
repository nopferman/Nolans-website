// Load and filter portfolio projects dynamically
document.addEventListener('DOMContentLoaded', () => {
    // Load Portfolio
    fetch('portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioGrid = document.getElementById('portfolio-grid');
            const filterButtons = document.querySelectorAll('.filter-button');

            renderProjects(data, 'all', portfolioGrid);

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const category = button.getAttribute('data-category');
                    renderProjects(data, category, portfolioGrid);
                });
            });
        })
        .catch(error => console.error('Error loading portfolio data:', error));

    // Load Testimonials
    fetch('testimonials.json')
        .then(response => response.json())
        .then(data => renderTestimonials(data))
        .catch(error => console.error('Error loading testimonials:', error));

    // Load Blog Posts
    fetch('blog.json')
        .then(response => response.json())
        .then(data => renderBlogPosts(data))
        .catch(error => console.error('Error loading blog posts:', error));

    // Add animations
    document.querySelectorAll('.section').forEach(section => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    });
});

function renderProjects(data, category, container) {
    container.innerHTML = '';
    const filteredProjects = data.filter(project => 
        category === 'all' || project.category === category
    );

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card slide-up';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy" class="project-img">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        container.appendChild(projectCard);
    });
}

function renderTestimonials(data) {
    const testimonialsSection = document.createElement('section');
    testimonialsSection.className = 'section testimonials';
    testimonialsSection.innerHTML = '<h2>Testimonials</h2><div class="testimonials-grid"></div>';
    document.querySelector('main').appendChild(testimonialsSection);

    const testimonialsGrid = testimonialsSection.querySelector('.testimonials-grid');
    data.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card scale-up';
        testimonialCard.innerHTML = `
            <p>"${testimonial.quote}"</p>
            <h4>${testimonial.name}</h4>
            <p>${testimonial.role}</p>
        `;
        testimonialsGrid.appendChild(testimonialCard);
    });
}

function renderBlogPosts(data) {
    const blogSection = document.createElement('section');
    blogSection.className = 'section';
    blogSection.innerHTML = '<h2>Blog</h2><div class="blog-grid" id="blog-grid"></div>';
    document.querySelector('main').insertBefore(blogSection, document.querySelector('#contact'));

    const blogGrid = blogSection.querySelector('.blog-grid');
    data.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card slide-up';
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy" class="blog-img">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="blog/${post.slug}.html" class="cta-button" aria-label="Read more about ${post.title}">Read More</a>
        `;
        blogGrid.appendChild(blogCard);
    });
}