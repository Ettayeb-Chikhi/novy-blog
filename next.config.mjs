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
   },
   images:{
        remotePatterns:[
            {
                hostname:"firebasestorage.googleapis.com"
            }
        ]
   }
};

export default nextConfig;
