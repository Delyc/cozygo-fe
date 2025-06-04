import { useState } from "react";
import { registerSchema } from "@/validation/registerSchema";
import Button from "@/components/molecules/Button";
import Input from "@/components/molecules/Input";
import CoverImage from "@/components/organisms/CoverImageUpload";
import Select, { SingleValue } from "react-select";
import { RoleOption } from "@/types/types";
import { useRegisterUser } from "@/services/hooks/auth";
import { useRouter } from "next/navigation";

const roleOptions: RoleOption[] = [
    { value: "AGENT", label: "Agent" },
    { value: "HOUSE_SEEKER", label: "House Seeker" },
];

export const RegisterForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        coverImage: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const { mutate: registerUser, isPending, error } = useRegisterUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSelectChange = (selectedOption: RoleOption) => {
        setFormData({ ...formData, role: selectedOption.value });
        setErrors((prev) => ({ ...prev, role: "" }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as
            | "username"
            | "email"
            | "password"
            | "role";

        let singleFieldSchema;
        switch (fieldName) {
            case "username":
                singleFieldSchema = registerSchema.pick({ username: true });
                break;
            case "email":
                singleFieldSchema = registerSchema.pick({ email: true });
                break;
            case "password":
                singleFieldSchema = registerSchema.pick({ password: true });
                break;
            case "role":
                singleFieldSchema = registerSchema.pick({ role: true });
                break;
            default:
                return;
        }

        const result = singleFieldSchema.safeParse({
            [fieldName]: formData[fieldName],
        });

        if (!result.success) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: result.error.errors[0].message,
            }));
        } else {
            setErrors((prev) => ({ ...prev, [fieldName]: "" }));
        }
    };

    const validateRole = () => {
        const roleSchema = registerSchema.pick({ role: true });
        const result = roleSchema.safeParse({ role: formData.role });

        if (!result.success) {
            setErrors((prev) => ({
                ...prev,
                role: result.error.errors[0].message,
            }));
        } else {
            setErrors((prev) => ({ ...prev, role: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        registerUser(formData, {
            onSuccess: (user) => {
                console.log("Registration successful", user);
                router.push("/login");
            },
            onError: (err) => {
                console.error("Registration failed", err);
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full md:w-1/2 py-10 px-4 lg:px-10 rounded bg-white gap-3"
        >
            {error && (
                <div className="bg-red-500/10 w-full py-3 rounded">
                    <p className="text-red-500 text-center text-sm">{error.message || "Registration failed. Please try again."}</p>
                </div>

            )}

            <Input
                id="username"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
            />

            <Input
                id="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
            />

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

            <div className="flex min-w-1/2 flex-col">
                <label htmlFor="role" className="text-gray-500">
                    Account Type
                </label>
                <Select
                    id="role"
                    name="role"
                    value={roleOptions.find((option) => option.value === formData.role)}
                    onChange={(option: SingleValue<RoleOption>) => {
                        if (option) {
                            handleSelectChange(option);
                            validateRole();
                        }
                    }}
                    options={roleOptions}
                    classNamePrefix="select"
                />
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <CoverImage
                onFileSelect={(imageUrl: string) => {
                    setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
                }}
            />

            <Button
                label={isPending ? "Submitting..." : "Submit"}
                type="submit"
                className="text-white cursor-pointer"
                disabled={isPending}
            />

            <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="underline">
                    Login
                </a>
            </p>
        </form>
    );
};
