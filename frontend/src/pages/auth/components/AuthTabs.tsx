import { HugeiconsIcon } from "@hugeicons/react";
import { Login01Icon, UserAdd02Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent } from "@/common/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthTabs() {
	return (
		<Card className="w-full max-w-md shadow-2xl">
			<CardContent>
				<Tabs className="gap-y-6" defaultValue="login">
					<TabsList className="w-full">
						<TabsTrigger value="login">
							<HugeiconsIcon icon={Login01Icon} strokeWidth={2} />
							Iniciar Sesión
						</TabsTrigger>
						<TabsTrigger value="register">
							<HugeiconsIcon icon={UserAdd02Icon} strokeWidth={2} />
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
