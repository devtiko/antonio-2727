import { Card, CardContent } from "@/common/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthTabs() {
	return (
		<Card className="w-full max-w-md overflow-hidden py-0 shadow-2xl">
			<CardContent className="flex flex-col bg-muted/30 p-6 md:p-8">
				<Tabs className="w-full gap-6" defaultValue="register">
					<TabsList className="grid h-11 w-full grid-cols-2 rounded-xl">
						<TabsTrigger
							className="gap-2 rounded-lg data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground"
							value="login"
						>
							<span className="material-symbols-outlined text-[18px]">
								login
							</span>
							Iniciar Sesión
						</TabsTrigger>
						<TabsTrigger
							className="gap-2 rounded-lg data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground"
							value="register"
						>
							<span className="material-symbols-outlined text-[18px]">
								how_to_reg
							</span>
							Registrarse
						</TabsTrigger>
					</TabsList>

					<TabsContent value="login">
						<LoginForm />
					</TabsContent>
					<TabsContent value="register">
						<RegisterForm />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
