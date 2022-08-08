const TableRow = (props: TableRowProps) => {
    return (
        <tr><td>{props.id}</td><td>{props.order}</td><td>{props.date}</td><td>{props.country}</td><td>{props.currency}</td><td>{props.amount}</td></tr>
    );
};

type TableRowProps = {
    id: number;
    order: string;
    date: string;
    country: string;
    currency: string;
    amount: number;
}

export default TableRow;