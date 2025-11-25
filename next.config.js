const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "mobi-profile-images-bucket.s3.ap-northeast-2.amazonaws.com",
    ], // 허용할 외부 이미지 도메인
  },
};

export default nextConfig;
