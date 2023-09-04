export interface ProtectedRouteProps {
	component: React.ReactNode;
	path?: string;
	roles: Array<string>;
}
