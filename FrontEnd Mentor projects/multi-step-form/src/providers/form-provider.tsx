import { useState, ReactNode, FormEvent } from "react"

import { ADD_ONS, PLANS } from "../data/data"
import { formValidationSchema } from "../schemas"
import {
	BillingCycle,
	FormContext,
	FormContextValue,
	OnSubmitReturn,
	selectAbleAddOn,
	Step
} from "../contexts/form-context"

export function FormProvider({
	steps,
	children
}: {
	steps: Step[]
	children: ReactNode
}) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)

	const [userInfo, setUserInfo] = useState<
		FormContextValue["data"]["userInfo"]
	>({
		email: null,
		name: null,
		phoneNumber: null
	})

	const [selectedPlan, setSelectedPlan] = useState<
		FormContextValue["data"]["selectedPlan"]
	>(PLANS[0])

	const [addOns, setAddOns] = useState<Array<selectAbleAddOn>>(
		ADD_ONS.map((add) => ({ ...add, isSelected: false }))
	)

	const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")

	const step = steps[currentStepIndex]
	const isFirstStep = currentStepIndex === 0
	const isLastStep = currentStepIndex === steps.length - 1

	function next() {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) return i
			return i + 1
		})
	}

	function back() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i
			return i - 1
		})
	}

	function goTo(index: number) {
		setCurrentStepIndex(index)
	}

	function onSubmit(
		e: FormEvent,
		data: FormContextValue["data"]
	): OnSubmitReturn {
		e.preventDefault()
		if (!isLastStep) return next()

		const parseResults = formValidationSchema.safeParse(data)

		if (!parseResults.success) {
			console.log(parseResults.error.flatten())

			return { ok: false, errors: "A LOT" }
		}

		setIsCompleted(true)
		return { ok: true, data }
	}

	return (
		<FormContext
			value={{
				form: {
					currentStepIndex,
					steps,
					step,
					isFirstStep,
					isLastStep,
					isCompleted,
					setIsCompleted,
					goTo,
					next,
					back,
					onSubmit
				},
				data: {
					userInfo,
					setUserInfo,
					selectedPlan,
					setSelectedPlan,
					addOns,
					setAddOns,
					billingCycle,
					setBillingCycle
				}
			}}
		>
			{children}
		</FormContext>
	)
}
