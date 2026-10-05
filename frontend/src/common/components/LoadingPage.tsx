import LoadingSpinner from "@/assets/svg/loading.svg?react";
import { PublicLayout } from "../layout/PublicLayout";

export function LoadingPage() {
	return (
		<PublicLayout>
			<LoadingSpinner
				className="w-14 h-14 animate-spin text-primary drop-shadow-[0_0_16px_rgba(195,244,0,0.4)]"
				aria-hidden="true"
			/>
		</PublicLayout>
	);
}
