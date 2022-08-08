import { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Payment } from "../table/Table.types";
import { addNewPayment } from "../data/restFns";

const Transactions = () => {
    const [message, setMessage] = useState<string>('');
    const initialValues: Payment = {
        id: 0,
        orderId: '',
        date: new Date().toISOString().slice(0, 10),
        country: 'USA',
        currency: 'USD',
        taxCode: 0,
        taxRate: 0.21,
        amount: 0,
        type: "VISA"
    };

    const save = (newPayment: Payment, helpers: FormikHelpers<Payment>) => {
        const response = addNewPayment(newPayment);

        response.then((result) => {
            helpers.setSubmitting(false);
            if (result.status === 200) setMessage(`Payment has been saved with id ${result.data.id}`);
            else setMessage(`There was an error with status ${result.status}`);
        })
        .catch(error => setMessage(error.message));
    };

    const formikForm = ({isSubmitting}: any) =>  
        <Form className="addTransactionsForm">
            <h2>New transaction</h2>
            <label htmlFor="orderId">Order Id</label>
            <Field type="text" id="orderId" name="orderId" />
            <br/>
            <label htmlFor="date">Date</label>
            <Field type="date" id="date" name="date"/>
            <br/>
            <label htmlFor="country">Country</label>
            <Field type="text"  id="country" name="country" />
            <br/>
            <label htmlFor="currency">Currency</label>
            <Field type="text"  id="currency" name="currency" />
            <br/>
            <label htmlFor="amount">Amount</label>
            <Field type="text"  id="amount" name="amount" />
            <br/>
            <label htmlFor="taxCode">Tax Code</label>
            <Field type="text"  id="taxCode" name="taxCode" />
            <br/>
            <label htmlFor="taxRate">Tax Rate</label>
            <Field type="text"  id="taxRate" name="taxRate"/>
            <br/>
            <label htmlFor="type">Type</label>
            <Field type="text"  id="type" name="type" />
            <br/>
            <button type="submit">Save</button>
            <div>{isSubmitting ? "Saving..." : message}</div>
        </Form>

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={save}
        >
            {formikForm}      
        </Formik>
    );
};

export default Transactions;