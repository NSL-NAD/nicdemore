export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://nicdemore.com/#person",
        name: "Nic DeMore",
        url: "https://nicdemore.com",
        image: "https://nicdemore.com/nicdemore.jpg",
        jobTitle: "Founder & Entrepreneur",
        description:
          "Co-founder of Margle Media and Good at Scale Studio. Builder, engineer, and entrepreneur based in Milwaukee, WI.",
        sameAs: [
          "https://www.linkedin.com/in/nic-demore",
          "https://www.instagram.com/nicdemore/",
          "https://goodatscale.studio",
        ],
        worksFor: [
          {
            "@type": "Organization",
            name: "Good at Scale Studio",
            url: "https://goodatscale.studio",
          },
          {
            "@type": "Organization",
            name: "Margle Media",
            url: "https://marglemedia.com",
          },
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Marquette University",
          url: "https://marquette.edu",
        },
        knowsAbout: [
          "Digital Marketing",
          "Venture Building",
          "AI and Automation",
          "Product Development",
          "Architecture and Design",
          "Entrepreneurship",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Milwaukee",
          addressRegion: "WI",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://nicdemore.com/#website",
        url: "https://nicdemore.com",
        name: "Nic DeMore",
        description:
          "Personal site of Nic DeMore: founder, builder, and operator based in Milwaukee, WI.",
        author: { "@id": "https://nicdemore.com/#person" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
