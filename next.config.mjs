import createMDX from "@next/mdx";

const withMDX = createMDX({});

const config = {
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: "/os",
        destination: "https://os-blond.vercel.app",
      },
      {
        source: "/os/:path*",
        destination: "https://os-blond.vercel.app/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "res.craft.do",
      },
      {
        protocol: "https",
        port: "",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        port: "",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "assets.literal.club",
      },
    ],
  },
};

export default withMDX(config);
