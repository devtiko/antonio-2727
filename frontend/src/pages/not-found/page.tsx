import { HugeiconsIcon } from "@hugeicons/react";
import { Flag03Icon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router";
import { Button } from "@/common/ui/button";

export function NotFoundPage() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<section className="relative z-10 flex flex-col items-center gap-6 justify-center max-w-5xl selection:bg-primary selection:text-primary-foreground">
			<div className="flex items-center tracking-tighter">
				{[4, 0, 4].map((num, index) => (
					<span
						key={`not_found_num_${index}`}
						className="font-serif text-[110px] leading-none font-extrabold text-surface-highest opacity-90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] sm:text-[180px] md:text-[230px]"
					>
						{num}
					</span>
				))}
			</div>

			<div className="max-w-2xl">
				<h1 className="font-serif text-[32px] text-center leading-10 font-bold tracking-tight text-emphasis sm:text-[40px] sm:leading-12">
					¡Te saliste del circuito!
				</h1>
				<p className="text-lg leading-7 text-center text-muted-foreground">
					Parece que la pista fue cancelada o el caracol se quedó dormido
					masticando lechuga.
				</p>
			</div>

			<Button
				size="lg"
				className="shadow-[0_0_24px_rgba(195,244,0,0.25)]"
				onClick={handleBack}
			>
				<HugeiconsIcon icon={Flag03Icon} strokeWidth={2} />
				Volver a la Pista
			</Button>
		</section>
	);
}
