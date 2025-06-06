"use client";

import { useState } from "react";
import { loginSchema } from "@/validation/loginSchema";
import Button from "@/components/molecules/Button";
import Input from "@/components/molecules/Input";
import { useLoginUser } from "@/services/hooks/auth";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types/types";

export const LoginForm = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo") || "/chat";
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "username">("email");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: loginUser, isPending, error } = useLoginUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as "email" | "username" | "password";
    const value = formData[fieldName];
    let singleFieldSchema;

    const baseSchema = loginSchema._def.schema;
    switch (fieldName) {
      case "email":
        singleFieldSchema = baseSchema.pick({ email: true });
        break;
      case "username":
        singleFieldSchema = baseSchema.pick({ username: true });
        break;
      case "password":
        singleFieldSchema = baseSchema.pick({ password: true });
        break;
      default:
        return;
    }

    const result = singleFieldSchema.safeParse({ [fieldName]: value });

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: result.error.errors[0].message,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend: LoginData =
      loginMethod === "email"
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, password: formData.password };

    // Validate before sending
    const result = loginSchema.safeParse(dataToSend);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    loginUser(dataToSend, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        router.push(redirectTo);
      },
      onError: (err: Error) => {
        console.error("Login failed", err);
      },
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full md:w-1/2 py-10 px-4 lg:px-10 rounded bg-white gap-3"
    >
      <h1 className="text-3xl text-center font-medium text-gray-800">
        Login with
      </h1>

      <div className="flex w-fit text-gray-500 space-x-4 mx-auto bg-slate-100 rounded px-2 py-2 justify-center mb-4">
        <button
          type="button"
          onClick={() => {
            setLoginMethod("email");
          }}
          className={`px-4 py-2 rounded ${loginMethod === "email" ? "bg-white" : ""
            }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginMethod("username");
          }}
          className={`px-4 py-2 rounded ${loginMethod === "username" ? "bg-white" : ""
            }`}
        >
          Username
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 w-full py-3 rounded">
          <p className="text-red-500 text-center text-sm">{error?.message}</p>
        </div>
      )}

      {loginMethod === "email" ? (
        <Input
          id="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
      ) : (
        <Input
          id="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
      )}

      <Input
        id="password"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
      />

      <Button
        label={isPending ? "Logging in..." : "Submit"}
        className="text-white cursor-pointer"
        type="submit"
        disabled={isPending}
      />

      <p className="text-sm text-center text-gray-500">
        Don{"'"}t have an account?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </form>
  );
};
