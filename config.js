// Site configuration
const siteConfig = {
    siteName: "John Doe - Personal Portfolio",
    siteUrl: "https://yourwebsite.com",
    author: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
    },
    resumeUrl: "resume.pdf"
};

// Export for use in other JavaScript files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
} else {
    window.siteConfig = siteConfig;
}