// "use client";
// import {z} from "zod";
// import {useState} from "react"; //npm import
// import Link from "next/link"; //npm import
// import {useForm} from "react-hook-form"; //npm import
// import {zodResolver} from "@hookform/resolvers/zod"; //npm import
// import { OctagonAlertIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import {FaGithub , FaGoogle} from "react-icons/fa"; //npm import


// import {Input} from "src/components/ui/input"; // local imports
// import {Button} from "src/components/ui/button";
// import {authClient} from "src/lib/auth-client"; // alias for better readability   
// import { Card, CardContent } from "src/components/ui/card"
// import { Alert , AlertTitle } from "src/components/ui/alert";
// import{
//    Form,
//    FormControl,
//    FormField,
//    FormItem,
//    FormLabel,
//    FormMessage
// } from "src/components/ui/form" // alias for better readability
// import { se } from "date-fns/locale";





// const formSchema = z.object ({
//    email : z.string().email(),
//    password: z.string().min(1 , {message: "Password is mandatory"}),
// })

// export const SignInView = () => {

//    const router = useRouter();


//    const [error , setError] = useState <string | null> (null);
//    const [pending , setPending] = useState (false);

//    const form = useForm<z.infer<typeof formSchema>>({
//       resolver : zodResolver(formSchema),
//       defaultValues : {
//          email : "",
//          password : "",
//       },

//    });

//    const onSubmit =  (data : z.infer<typeof formSchema>) => {
//       setError(null);
//       setPending(true);
//       authClient.signIn.email(
//          {
//             email: data.email,
//             password : data.password,
//             callbackURL : "/",
//          },
//          {
//             onSuccess : () => {
//                setPending(false);
//                router.push("/");
     
//             },
//             onError : ({error}) => {
//                setError(error.message);
//             },
            
//          }
//       );


//    };

//    const onSocial =  (provider : "github" | "google") => {
//       setError(null);
//       setPending(true);
//       authClient.signIn.social(
//          { 
//             provider: provider,
//             callbackURL : "/"
  
//          },
//          {
//             onSuccess : () => {
//                setPending(false);
//             },
//             onError : ({error}) => {
//                setError(error.message);
//             },
            
//          }
//       );
  
  
//    };

//    return(
//     <div className = "flex flex-col gap-6">
//     <Card className = "overflow-hidden p-0">
//         <CardContent className ="grid p-0 md:grid-cols-2" >
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className = "p-6 md:p-8">
//             <div className ="flex flex-col gap-6">
//                <div className = "flex flex-col items-center text-center">
//                  <h1 className = "text-2xl font-bold">
//                    Welcome Back
//                  </h1>
//                  <p className ="text-muted-foreground text-balance">
//                    Login to your account 
//                  </p>
//                </div>
//                <div className ="grid gap-3">
//                     <FormField 
//                     control = {form.control}
//                     name = "email"
//                      render = {({field}) => (
//                            <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                                  <Input 
//                                  type ="email"
//                                  placeholder="Enter your email"
//                                  {...field} 
//                                  />
//                             </FormControl>
//                             <FormMessage />
//                            </FormItem>
//                      )}

//                     />
//                </div>

//                <div className ="grid gap-3">
//                     <FormField 
//                     control = {form.control}
//                     name = "password"
//                      render = {({field}) => (
//                            <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                                  <Input 
//                                  type ="password"
//                                  placeholder="********"
//                                  {...field} 
//                                  />
//                             </FormControl>
//                             <FormMessage />
//                            </FormItem>
//                      )}
//                     />
//                </div>

//                {!!error && (
//                <Alert variant="destructive">
//                  <OctagonAlertIcon className="h-4 w-4" />
//                  <AlertTitle className="text-sm">
//                    {error}
//                  </AlertTitle>
//                </Alert>
//                )}

//                <Button type="submit" disabled = {pending} className ="w-full">
//                  Sign In
//                </Button>

//                <div className = "after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
//                   <span className = "bg-card text-muted-foreground relative z-10 px-2">
//                     Or continue with
//                   </span>
//                </div>

//                <div className = "grid grid-cols-2 gap-4"> 
//                   <Button 
//                     onClick={()=>onSocial("google")}
//                   disabled = {pending}
//                   variant ="outline"
//                   type = "button"
//                   className ="w-full"
//                   >
//                      <FaGoogle/> 
//                   </Button>   
                  
//                   <Button 
//                    onClick={()=>onSocial("github")}
//                   disabled = {pending}
//                   variant ="outline"
//                   type = "button"
//                   className ="w-full"
//                   >
//                      <FaGithub/> 
//                   </Button> 
//                </div>

//                <div className="text-center text-sm">
//                Don't have an account? {" "}
//                <Link href="/auth/sign-up" className = "underline underline-offset-4">
//                   Sign Up
//                </Link>
//                </div>

//             </div> 
//             </form>
//         </Form>

//         <div className= "bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center ">
//           <img src="/logo.svg" alt="Image" className ="h-[92px] w-[92px]"></img>
//           <p className = "text-2xl font-semibold  text-white">
//             Engage.AI
//            </p>
//         </div>
//         </CardContent>
//     </Card>

//     <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
//       By Clicking continue, you agree to our <a href="#">Terms of Services</a> and <a href ="#">Privacy Policy</a> 
//     </div>
    
//     </div>
//    );
// };








"use client";
import {z} from "zod";
import {useState, useEffect} from "react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { OctagonAlertIcon, Bot, Cpu, Brain, Zap, Activity, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {FaGithub , FaGoogle} from "react-icons/fa";

import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";
import {authClient} from "src/lib/auth-client";
import { Card, CardContent } from "src/components/ui/card"
import { Alert , AlertTitle } from "src/components/ui/alert";
import{
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "src/components/ui/form"

const formSchema = z.object ({
   email : z.string().email(),
   password: z.string().min(1 , {message: "Password is mandatory"}),
})

// Floating animation component
const FloatingIcon = ({ icon: Icon, delay, duration, x, y, size = "w-8 h-8" }: {
  icon: any,
  delay: number,
  duration: number,
  x: string,
  y: string,
  size?: string
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`absolute ${size} text-green-400/30 animate-pulse`}
      style={{
        left: x,
        top: y,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Icon className="w-full h-full" />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.6; }
        }
        div {
          animation: float ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
        }
      `}</style>
    </div>
  );
};

// Circuit pattern component
const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M10 10h20v20h-20z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="20" cy="20" r="2" fill="currentColor"/>
            <path d="M20 10v-10M30 20h10M20 30v10M10 20h-10" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-green-400"/>
      </svg>
    </div>
  );
};

// Animated gradient orbs
const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 -left-40 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '8s', animationDelay: '1s' }} />
    </div>
  );
};

export const SignInView = () => {
   const router = useRouter();
   const [error , setError] = useState <string | null> (null);
   const [pending , setPending] = useState (false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver : zodResolver(formSchema),
      defaultValues : {
         email : "",
         password : "",
      },
   });

   const onSubmit =  (data : z.infer<typeof formSchema>) => {
      setError(null);
      setPending(true);
      authClient.signIn.email(
         {
            email: data.email,
            password : data.password,
            callbackURL : "/",
         },
         {
            onSuccess : () => {
               setPending(false);
               router.push("/");
            },
            onError : ({error}) => {
               setError(error.message);
               setPending(false);
            },
         }
      );
   };

   const onSocial =  (provider : "github" | "google") => {
      setError(null);
      setPending(true);
      authClient.signIn.social(
         { 
            provider: provider,
            callbackURL : "/"
         },
         {
            onSuccess : () => {
               setPending(false);
            },
            onError : ({error}) => {
               setError(error.message);
               setPending(false);
            },
         }
      );
   };

   return(
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 relative">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Welcome Back
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account 
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <FormField 
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField 
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="********"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!!error && (
                  <Alert variant="destructive">
                    <OctagonAlertIcon className="h-4 w-4" />
                    <AlertTitle className="text-sm">
                      {error}
                    </AlertTitle>
                  </Alert>
                )}

                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "Signing In..." : "Sign In"}
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4"> 
                  <Button 
                    onClick={() => onSocial("google")}
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    <FaGoogle/> 
                  </Button>   
                  
                  <Button 
                    onClick={() => onSocial("github")}
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    <FaGithub/> 
                  </Button> 
                </div>

                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/sign-up" className="underline underline-offset-4">
                    Sign Up
                  </Link>
                </div>
              </div> 
            </form>
          </Form>

          {/* Enhanced animated background */}
          <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center overflow-hidden">
            
            {/* Animated background elements */}
            <AnimatedOrbs />
            <CircuitPattern />
            
            {/* Floating AI icons */}
            <FloatingIcon icon={Bot} delay={0} duration={6} x="15%" y="20%" size="w-6 h-6" />
            <FloatingIcon icon={Cpu} delay={1} duration={8} x="80%" y="15%" size="w-8 h-8" />
            <FloatingIcon icon={Brain} delay={2} duration={5} x="10%" y="70%" size="w-7 h-7" />
            <FloatingIcon icon={Zap} delay={3} duration={7} x="85%" y="60%" size="w-5 h-5" />
            <FloatingIcon icon={Activity} delay={1.5} duration={6} x="25%" y="85%" size="w-6 h-6" />
            <FloatingIcon icon={MessageCircle} delay={4} duration={9} x="70%" y="80%" size="w-8 h-8" />
            <FloatingIcon icon={Bot} delay={2.5} duration={4} x="60%" y="25%" size="w-6 h-6" />
            <FloatingIcon icon={Cpu} delay={0.5} duration={7} x="35%" y="50%" size="w-5 h-5" />

            {/* Main logo and text with enhanced styling */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" 
                     style={{ animationDuration: '3s' }} />
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 relative z-10">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  Engage.AI
                </h2>
                <p className="text-green-100 text-lg font-medium">
                  AI-Powered Meetings
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4 text-green-200 text-sm">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Intelligent • Real-time • Secure</span>
                </div>
              </div>
            </div>

            {/* Animated data streams */}
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex justify-between items-center text-green-300/60 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live Processing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" 
                       style={{ animationDelay: '1s' }} />
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" 
                       style={{ animationDelay: '2s' }} />
                  <span>Smart Insights</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Services
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a> 
      </div>
    </div>
   );
};

