"use client";
import {z} from "zod";
import {useState, useEffect, type ComponentType, type SVGProps} from "react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import { OctagonAlertIcon, Bot, Cpu, Brain, Zap, Activity, MessageCircle, Users, Shield } from "lucide-react";
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
   name: z.string().min(1 , {message: "Name is required"}),
   email : z.string().email(),
   password: z.string().min(1 , {message: "Password is mandatory"}),
   Confirmpassword: z.string().min(1 , {message: "Password is mandatory"}),
})
.refine((data)=>data.password === data.Confirmpassword , {
    message: "Passwords do not match",
    path: ["Confirmpassword"],
});

// Floating animation component
const FloatingIcon = ({ icon: Icon, delay, duration, x, y, size = "w-8 h-8" }: {
  icon: ComponentType<SVGProps<SVGSVGElement>>,
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


const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <pattern id="circuit-signup" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M10 10h20v20h-20z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="20" cy="20" r="2" fill="currentColor"/>
            <path d="M20 10v-10M30 20h10M20 30v10M10 20h-10" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-signup)" className="text-green-400"/>
      </svg>
    </div>
  );
};


const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s' }} />
      <div className="absolute top-1/2 -left-40 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '7s', animationDelay: '2s' }} />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }} />
    </div>
  );
};

export const SignUpView = () => {
   const router = useRouter();
   const [error , setError] = useState <string | null> (null);
   const [pending , setPending] = useState (false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver : zodResolver(formSchema),
      defaultValues : {
        name: "",
         email : "",
         password : "",
        Confirmpassword : "",
      },
   });

   const onSubmit =  (data : z.infer<typeof formSchema>) => {
      setError(null);
      setPending(true);
      authClient.signUp.email(
         { 
            name: data.name,
            email: data.email,
            password : data.password,
            callbackURL : "/",
         },
         {
            onSuccess : () => {
               setPending(false);
               router.push("/")
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
            callbackURL : "/",
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
                    Let&apos;s get started
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>

                <div className="grid gap-3">
                  <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            type="text"
                            placeholder="John Doe"
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

                <div className="grid gap-3">
                  <FormField 
                    control={form.control}
                    name="Confirmpassword"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
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
                  {pending ? "Creating Account..." : "Sign Up"}
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
                  Already have an account?{" "}
                  <Link href="/auth/sign-in" className="underline underline-offset-4">
                    Sign In
                  </Link>
                </div>
              </div> 
            </form>
          </Form>

        
          <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center overflow-hidden">
            
      
            <AnimatedOrbs />
            <CircuitPattern />
            
            
            <FloatingIcon icon={Users} delay={0} duration={6} x="20%" y="15%" size="w-6 h-6" />
            <FloatingIcon icon={Shield} delay={1} duration={8} x="75%" y="20%" size="w-8 h-8" />
            <FloatingIcon icon={Brain} delay={2} duration={5} x="15%" y="75%" size="w-7 h-7" />
            <FloatingIcon icon={Zap} delay={3} duration={7} x="80%" y="65%" size="w-5 h-5" />
            <FloatingIcon icon={Activity} delay={1.5} duration={6} x="30%" y="80%" size="w-6 h-6" />
            <FloatingIcon icon={MessageCircle} delay={4} duration={9} x="65%" y="85%" size="w-8 h-8" />
            <FloatingIcon icon={Bot} delay={2.5} duration={4} x="55%" y="30%" size="w-6 h-6" />
            <FloatingIcon icon={Cpu} delay={0.5} duration={7} x="40%" y="45%" size="w-5 h-5" />

          
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" 
                     style={{ animationDuration: '4s' }} />
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 relative z-10">
                  <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  Engage.AI
                </h2>
                <p className="text-green-100 text-lg font-medium">
                  Join the Future
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4 text-green-200 text-sm">
                  <Shield className="w-4 h-4 animate-pulse" />
                  <span>Secure • Intelligent • Collaborative</span>
                </div>
              </div>
            </div>

          
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex justify-between items-center text-green-300/60 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Free Trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" 
                       style={{ animationDelay: '1s' }} />
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" 
                       style={{ animationDelay: '2s' }} />
                  <span>Team Ready</span>
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