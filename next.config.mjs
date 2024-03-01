/** @type {import('next').NextConfig} */
const nextConfig = {
   async redirects() {
    return [
        {
            source:'/',
            destination:'/novy-blog',
            permanent:true
        }
    ]
   }
};

export default nextConfig;
