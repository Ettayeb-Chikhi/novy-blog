import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith@mp.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
               try{
                    if(credentials!=null){
                        return {
                            email:credentials.email
                        };
                    }else{
                        return null;
                    }
               }catch(error){
                console.log(error);
                return null;
               }
            },

        })
    ],
    pages: {
        signIn: "/login"
    },
    session:{
        maxAge :  24*60*60 // 1 day
    }
    

})

export { handler as GET, handler as POST }