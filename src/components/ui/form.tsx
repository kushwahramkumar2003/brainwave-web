import React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//@ts-ignore
interface FormProps<T extends z.ZodType<any, any>>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  schema: T;
  onSubmit: SubmitHandler<z.infer<T>>;
  children: (methods: UseFormReturn<z.infer<T>>) => React.ReactNode;
}

export function Form<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
      {children(methods)}
    </form>
  );
}
