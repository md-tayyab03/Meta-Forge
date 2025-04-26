import React from 'react';

const CodeSnippets = {
  digitalMarketing: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Comprehensive digital marketing strategies for business growth. Learn about SEO, content marketing, social media, and PPC campaigns.">
    <meta name="keywords" content="digital marketing, SEO, content marketing, social media marketing, PPC, online advertising">
    <title>Digital Marketing Solutions | Boost Your Online Presence</title>
    <link rel="canonical" href="https://example.com/digital-marketing">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Digital Marketing Solutions",
        "description": "Expert digital marketing services to grow your business online",
        "publisher": {
            "@type": "Organization",
            "name": "MetaForge",
            "logo": {
                "@type": "ImageObject",
                "url": "https://example.com/logo.png"
            }
        }
    }
    </script>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#case-studies">Case Studies</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h1>Digital Marketing Strategies for Business Growth</h1>
            
            <section id="services">
                <h2>Our Digital Marketing Services</h2>
                <div className="service-grid">
                    <div className="service-card">
                        <h3>SEO-AUDIT TOOL</h3>
                        <p>Improve your website's visibility in search results with our comprehensive SEO strategies.</p>
                        <ul>
                            <li>Keyword research and optimization</li>
                            <li>Technical SEO audits</li>
                            <li>Content strategy development</li>
                        </ul>
                    </div>
                    <div className="service-card">
                        <h3>Content Marketing</h3>
                        <p>Create engaging content that resonates with your target audience.</p>
                        <ul>
                            <li>Blog content creation</li>
                            <li>Social media content</li>
                            <li>Email marketing campaigns</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="case-studies">
                <h2>Success Stories</h2>
                <div className="case-study">
                    <h3>E-commerce Growth Case Study</h3>
                    <p>How we helped an online retailer increase their revenue by 200% in 6 months.</p>
                    <div className="metrics">
                        <div className="metric">
                            <span className="number">200%</span>
                            <span className="label">Revenue Growth</span>
                        </div>
                        <div className="metric">
                            <span className="number">150%</span>
                            <span className="label">Traffic Increase</span>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    </main>

    <footer>
        <div className="footer-content">
            <section aria-label="Contact information">
                <h2>Contact Us</h2>
                <address>
                    <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </address>
            </section>
            <section aria-label="Social media links">
                <h2>Follow Us</h2>
                <ul>
                    <li><a href="https://twitter.com/example" aria-label="Twitter">Twitter</a></li>
                    <li><a href="https://linkedin.com/company/example" aria-label="LinkedIn">LinkedIn</a></li>
                </ul>
            </section>
        </div>
    </footer>
</body>
</html>`,

  healthcare: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Advanced healthcare solutions and medical services. Expert care, innovative treatments, and patient-focused healthcare services.">
    <meta name="keywords" content="healthcare, medical services, patient care, healthcare solutions, medical treatment">
    <title>Healthcare Solutions | Quality Medical Care Services</title>
    <link rel="canonical" href="https://example.com/healthcare">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Healthcare Solutions",
        "description": "Providing quality healthcare services and medical care",
        "medicalSpecialty": "General Practice",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Medical Center Drive",
            "addressLocality": "Healthcare City",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
        }
    }
    </script>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#doctors">Our Doctors</a></li>
                <li><a href="#appointments">Appointments</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h1>Comprehensive Healthcare Services</h1>
            
            <section id="services">
                <h2>Our Medical Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>Primary Care</h3>
                        <p>Comprehensive primary healthcare services for all ages.</p>
                        <ul>
                            <li>Routine check-ups</li>
                            <li>Preventive care</li>
                            <li>Chronic disease management</li>
                        </ul>
                    </div>
                    <div className="service-card">
                        <h3>Specialized Care</h3>
                        <p>Expert care for specific medical conditions.</p>
                        <ul>
                            <li>Cardiology</li>
                            <li>Orthopedics</li>
                            <li>Pediatrics</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="doctors">
                <h2>Our Medical Team</h2>
                <div className="doctor-profiles">
                    <div className="doctor-card">
                        <img src="doctor1.jpg" alt="Dr. John Smith - Cardiologist" width="200" height="200">
                        <h3>Dr. John Smith</h3>
                        <p>Cardiologist</p>
                        <p>20 years of experience</p>
                    </div>
                    <div className="doctor-card">
                        <img src="doctor2.jpg" alt="Dr. Sarah Johnson - Pediatrician" width="200" height="200">
                        <h3>Dr. Sarah Johnson</h3>
                        <p>Pediatrician</p>
                        <p>15 years of experience</p>
                    </div>
                </div>
            </section>
        </article>
    </main>

    <footer>
        <div className="footer-content">
            <section aria-label="Contact information">
                <h2>Contact Us</h2>
                <address>
                    <p>Address: 123 Medical Center Drive, Healthcare City, State 12345</p>
                    <p>Emergency: <a href="tel:+911">911</a></p>
                    <p>Appointments: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </address>
            </section>
        </div>
    </footer>
</body>
</html>`,

  ai: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore the world of Artificial Intelligence. Learn about AI technologies, machine learning, and their applications in modern business.">
    <meta name="keywords" content="artificial intelligence, AI, machine learning, deep learning, neural networks">
    <title>AI Solutions | Artificial Intelligence Services</title>
    <link rel="canonical" href="https://example.com/ai">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#about">About AI</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h1>Artificial Intelligence Solutions</h1>
            
            <section id="about">
                <h2>About Artificial Intelligence</h2>
                <p>Artificial Intelligence is transforming industries and creating new opportunities for businesses worldwide.</p>
            </section>

            <section id="services">
                <h2>Our AI Services</h2>
                <div className="services">
                    <div className="service">
                        <h3>Machine Learning</h3>
                        <p>Custom machine learning solutions for your business needs.</p>
                    </div>
                    <div className="service">
                        <h3>AI Consulting</h3>
                        <p>Expert guidance on implementing AI in your organization.</p>
                    </div>
                </div>
            </section>
        </article>
    </main>

    <footer>
        <div className="footer-content">
            <p>Contact us for AI solutions: <a href="mailto:ai@example.com">ai@example.com</a></p>
        </div>
    </footer>
</body>
</html>`
};

export default CodeSnippets; 