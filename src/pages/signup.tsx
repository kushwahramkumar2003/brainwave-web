import { z } from "zod";
import { Form } from "../components/ui/form";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authServices";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup Successful!", {
        description: "Redirecting to login page...",
        duration: 3000,
      });
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      toast.error("Signup Failed", {
        description: error.message || "Please try again.",
      });
    },
  });

  const handleSubmit = async (values: z.infer<typeof signUpSchema>) => {
    // Validate form before submission
    const validationResult = signUpSchema.safeParse(values);

    if (!validationResult.success) {
      validationResult.error.errors.forEach((err) => {
        toast.error(err.message, {
          position: "top-right",
        });
      });
      return;
    }

    const { confirmPassword, ...submitData } = values;

    await mutate(submitData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <Form
          schema={signUpSchema}
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {({ formState }) => (
            <>
              <Input
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
                // register={register}
                error={formState.errors.username}
                required
                disabled={isSubmitting}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                // register={register}
                error={formState.errors.password}
                required
                disabled={isSubmitting}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                // register={register}
                error={formState.errors.confirmPassword}
                required
                disabled={isSubmitting}
              />
              <div>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isLoading || isSubmitting}
                >
                  {isSubmitting
                    ? "Redirecting..."
                    : isLoading
                    ? "Signing Up..."
                    : "Sign up"}
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
