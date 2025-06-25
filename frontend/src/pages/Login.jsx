import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" })
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })

  const [registerUser, { data: registerData, error: registerError, isLoading: registerLoading, isSuccess: registerSuccess }] = useRegisterUserMutation()
  const [loginUser, { data: loginData, error: loginError, isLoading: loginLoading, isSuccess: loginSuccess }] = useLoginUserMutation()

  const navigate = useNavigate()


  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }
    else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegister = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    //console.log(inputData);
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  }

  useEffect (()=>{
    if(registerSuccess && registerData){
      toast.success(registerData.message || "Sign Up Successfully")
    }
    if(registerError){
      toast.error(registerData.data.message || "Sign Up Failed")
    }
    if(loginSuccess && loginData){
      toast.success(loginData.message || "Login Successully")
      navigate("/")
    }
    if(loginError){
      toast.error(loginData.data.message || "Login In Failed")
    }
  }, [loginLoading, registerLoading, loginData, registerData, loginError, registerError])

  

  return (
    <div className="flex item-center justify-center w-full mt-20">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create A New Account & Click Sign Up When You Are Done 🙂.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  type="text"
                  placeholder="Eg. Sam Tony Smith"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  name="email"
                  value={signupInput.email}
                  type="email"
                  placeholder="Eg. abc@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")} name="password"
                  value={signupInput.password}
                  type="password"
                  placeholder="Eg. Abcdefg@123"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerLoading} onClick={() => handleRegister("signup")}>
                {
                  registerLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait !!!</>) : "SignUp" 
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login To Your Account & Click Login When You Are Done 🙂.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="email"
                  value={loginInput.email}
                  type="email"
                  placeholder="Eg. abc@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="password"
                  value={loginInput.password}
                  type="password"
                  placeholder="Eg. Abcdefg@123"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginLoading} onClick={() => handleRegister("login")}>
                {
                  loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait !!!
                    </>
                  ): "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

  )
}

export default Login;
