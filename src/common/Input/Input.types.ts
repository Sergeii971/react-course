export interface InputProps {
	type: string;
	name: string;
	id?: string;
	value: string;
	required?: boolean;
	labelText?: string;
	placeholderText: string;
	onChange: (event) => void;
}
