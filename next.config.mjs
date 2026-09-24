/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Migracje (drizzle/) czyta instrumentation przy starcie — muszą być w obrazie standalone.
  outputFileTracingIncludes: { '/*': ['./drizzle/**/*'] },
};

export default nextConfig;
