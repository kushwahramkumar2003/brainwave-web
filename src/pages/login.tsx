import { z } from "zod";
import { Form } from "../components/ui/form";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authServices";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginSchema = z.object({
  username: z.string().min(3, "Invalid username address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successful!", {
        description: "Redirecting to dashboard...",
        duration: 3000,
      });
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/b");
      }, 3000);
    },
    onError: (error) => {
      toast.error("Login Failed", {
        description: error.message || "Invalid credentials. Please try again.",
      });
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    // Validate form before submission
    const validationResult = loginSchema.safeParse(values);

    if (!validationResult.success) {
      validationResult.error.errors.forEach((err) => {
        toast.error(err.message, {
          position: "top-right",
        });
      });
      return;
    }

    try {
      await mutate(values);
    } catch (error) {
      toast.error("Submission Error", {
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Form
          schema={loginSchema}
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {({ register, formState }) => (
            <>
              <Input
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                register={register}
                error={formState.errors.username}
                required
                disabled={isSubmitting}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                register={register}
                error={formState.errors.password}
                required
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading || isSubmitting}
                >
                  {isSubmitting
                    ? "Redirecting..."
                    : isLoading
                    ? "Signing In..."
                    : "Sign in"}
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
