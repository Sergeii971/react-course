export interface Author {
	id: string;
	name: string;
}

export function buildAuthor(id: string, name: string): Author {
	return { id: id, name: name };
}
