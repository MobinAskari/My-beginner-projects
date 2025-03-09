import { useContext } from "react"
import { FormContext } from "../contexts/form-context"

export function useForm() {
	const value = useContext(FormContext)

	if (value === undefined) {
		throw new Error("useForm must be used within a FormContext")
	}

	return value
}
