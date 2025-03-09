import { InputHTMLAttributes, useState } from "react"
import { ZodSchema } from "zod"
import { useDebouncedCallback } from "use-debounce"
import { emailSchema, nameSchema, phoneNumberSchema } from "../schemas"
import { cn } from "../utils"
import { useForm } from "../hooks/use-form"
import { UserInfo } from "../contexts/form-context"

export type StepOneInput = {
	name: keyof UserInfo
	labelTitle: string
	placeholder: string
	type: InputHTMLAttributes<HTMLInputElement>["type"]
	schema: ZodSchema
}

const STEP_ONE_INPUTS: StepOneInput[] = [
	{
		name: "name",
		labelTitle: "Name",
		placeholder: "e.g. Stephen King",
		type: "text",
		schema: nameSchema
	},
	{
		name: "email",
		labelTitle: "Email Address",
		placeholder: "e.g. stephenking@lorem.com", // test@test.com
		type: "email",
		schema: emailSchema
	},
	{
		name: "phoneNumber",
		labelTitle: "Phone Number",
		placeholder: "e.g. +1 234 567 890", // 2022032034
		type: "tel",
		schema: phoneNumberSchema
	}
]

function TextTypeInput({
	labelTitle,
	name,
	placeholder,
	type,
	schema
}: StepOneInput) {
	const {
		data: { userInfo, setUserInfo }
	} = useForm()

	const [error, setError] = useState<string | null>(null)

	const debouncedCheck = useDebouncedCallback((value: string) => {
		const result = schema.safeParse(value)

		if (result.error) {
			setError(result.error.flatten().formErrors.join(", "))
			return
		}

		setError(null)
	}, 400)

	return (
		<div>
			<div className="flex justify-between items-center gap-2">
				<label
					htmlFor={name}
					className="text-marine-blue text-xs"
				>
					{labelTitle}
				</label>
				{error && (
					<p className="text-strawberry-red text-xs truncate max-[375px]:max-w-52">
						{error}
					</p>
				)}
			</div>
			<input
				required
				id={name}
				type={type}
				name={name}
				placeholder={placeholder}
				defaultValue={userInfo[name] ?? ""}
				onChange={(e) => {
					const newVal = e.target.value

					setUserInfo({ ...userInfo, [name]: newVal })

					debouncedCheck(newVal)
				}}
				className={cn(
					"w-full p-2 rounded-md border outline-marine-blue text-marine-blue",
					{ "border-strawberry-red": error }
				)}
			/>
		</div>
	)
}

export default function StepOne() {
	const formattedInputNames = new Intl.ListFormat("en", {
		style: "long",
		type: "conjunction"
	}).format(STEP_ONE_INPUTS.map((inp) => inp.labelTitle.toLocaleLowerCase()))

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-xl font-bold text-marine-blue">Personal Info</h1>
			<p className="text-cool-gray">
				Please provide your {formattedInputNames}.
			</p>
			{STEP_ONE_INPUTS.map((input) => (
				<TextTypeInput
					key={input.name + input.placeholder}
					{...input}
				/>
			))}
		</div>
	)
}
