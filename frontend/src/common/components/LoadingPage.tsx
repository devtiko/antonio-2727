import { PublicLayout } from "../layout/PublicLayout";

export function LoadingPage() {
	return (
		<PublicLayout>
			<svg
				className="w-14 h-14 animate-spin text-primary drop-shadow-[0_0_16px_rgba(195,244,0,0.4)]"
				fill="none"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					className="opacity-20"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="2.5"
				></circle>
				<path
					className="opacity-90"
					d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
					fill="currentColor"
				></path>
			</svg>
		</PublicLayout>
	);
}
