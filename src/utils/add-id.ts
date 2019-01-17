/**
 * Create a callback that adds an ID field to an object.
 */
const memo: { [key: string]: any } = {};

export function addId(id: string) {
	return (
		memo[id] ||
		(memo[id] = (obj: any) => {
			obj.id = id;
			return obj;
		})
	);
}
