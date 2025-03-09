import { cn } from "./utils"

import Sidebar from "./components/sidebar"
import { FormWrapper } from "./components/form-wrapper"

import { FormEvent } from "react"
import ThankYouScreen from "./components/thank-you-screen"
import { useForm } from "./hooks/use-form"
import { userInfoSchema } from "./schemas"

function Steps() {
	const {
		data,
		form: { isFirstStep, isLastStep, isCompleted, back, next, step, onSubmit }
	} = useForm()

	function onSubmitForm(e: FormEvent) {
		const result = onSubmit(e, data)

		if (!result) return

		if (!result.ok) {
			console.error(result.errors)

			return
		}
	}

	if (isCompleted)
		return (
			<div
				className={cn("max-[375px]:h-full", "w-full relative flex flex-col")}
			>
				<FormWrapper>
					<ThankYouScreen />
				</FormWrapper>
			</div>
		)

	return (
		<div className={cn("max-[375px]:h-full", "w-full relative flex flex-col")}>
			<FormWrapper>{step.component}</FormWrapper>
			<div className="bg-white mt-auto flex justify-between items-center">
				{!isFirstStep && !isCompleted && (
					<button
						className="text-cool-gray hover:text-marine-blue p-3 rounded-md transition-all m-4"
						onClick={back}
					>
						Go Back
					</button>
				)}

				{!isLastStep ? (
					<button
						className="bg-marine-blue hover:bg-marine-blue/90 text-white p-3 rounded-md transition-all ml-auto m-4"
						onClick={() => {
							const { userInfo } = data

							const parsed = userInfoSchema.safeParse(userInfo)

							if (parsed.success) next()
						}}
					>
						Next Step
					</button>
				) : null}

				{isLastStep ? (
					<button
						className="bg-purplish-blue hover:bg-purplish-blue/90 text-white p-3 px-6 rounded-md transition-all ml-auto m-4"
						onClick={onSubmitForm}
					>
						Confirm
					</button>
				) : null}
			</div>
		</div>
	)
}

function Card() {
	return (
		<div
			className={cn(
				`bg-white mx-auto max-w-[1000px] sm:w-[85%] w-full min-h-96 h-fit rounded-xl flex`,
				`min-[375px]:p-4 min-[375px]:my-auto`,
				`max-[375px]:flex-col max-[375px]:h-full max-[375px]:mx-auto max-[375px]:bg-magnolia`
			)}
		>
			<Sidebar />
			<Steps />
		</div>
	)
}

export default function App() {
	return (
		<div className="h-screen grid items-center w-full">
			<Card />
		</div>
	)
}
