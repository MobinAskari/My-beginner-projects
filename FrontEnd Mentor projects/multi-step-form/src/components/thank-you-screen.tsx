import ThankYouSVG from "/assets/images/icon-thank-you.svg?url"

export default function ThankYouScreen() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 h-full text-center">
			<img
				width={80}
				height={80}
				src={ThankYouSVG}
				alt="Thank you"
			/>
			<strong className="text-lg">Thank you!</strong>
			<p className="text-cool-gray text-balance">
				Thanks for confirming your subscription! We hope you have fun using our
				platform. If you ever need support, please feel free to email us at
				support@loremgaming.com.
			</p>
		</div>
	)
}
