type ReduceValue = number | string | Array<any>;

type ReduceCallback = (
	prevValue: any,
	currValue: any,
	currIndex: number,
	array: any[] | ArrayLike<any>
) => any;

export { ReduceValue, ReduceCallback };

/*
export class Arrayish<T> {
	length: number;
	reduce: { (callbackfn: (arg0: ReduceCallback) => ReduceValue): ReduceValue }
}
*/
