export function InvoiceValidate(values, addtable) {
  console.log("values======>", values, addtable);
  let errors = {};
  if (!values?.bill_no) {
    errors.bill_no = "bill_no is required";
  }

  if (!values?.invoice_date) {
    errors.invoice_date = "Please select date";
  }
  if (!values?.customer_id) {
    errors.customer_id = "Please Select Mobile Number ";
    errors.customer_name = "customer name is required";
    errors.customer_address = "customer address is required";
  }
  if (!values?.productdata[addtable - 1]?.product_id) {
    errors.product_id = "Please Select Product ";
  }
  if (!values?.productdata[addtable - 1]?.weight) {
    errors.weight = "weight is required ";
  }
  if (!values?.productdata[addtable - 1]?.rate) {
    errors.rate = "rate is required ";
  }
  if (!values?.productdata[addtable - 1]?.amount) {
    errors.amount = "amount is required ";
  }

  return errors;
}

export function InvoiceEditValidate(values) {
  console.log("values======>", values);
  let errors = {};
  if (!values?.bill_no) {
    errors.bill_no = "bill_no is required";
  }

  if (!values?.invoice_date) {
    errors.invoice_date = "Please select date";
  }
  if (!values?.customer_id) {
    errors.customer_id = "Please Select Mobile Number ";
    errors.customer_name = "customer name is required";
    errors.customer_address = "customer address is required";
  }

  // eslint-disable-next-line array-callback-return
  values?.productdata?.map((data, index) => {
    console.log(
      "indexinformvalidation",
      index,
      "values?.productdata[index]?.weight",
      values?.productdata[index]?.weight
    );
    if (
      !values?.productdata[index]?.weight ||
      values?.productdata[index]?.weight == "NaN"
    ) {
      errors.weight = "weight is required ";
    }
    if (
      !values?.productdata[index]?.product_id ||
      values?.productdata[index]?.product_id == "NaN"
    ) {
      errors.product_id = "Please Select Product ";
    }
    if (
      !values?.productdata[index]?.rate ||
      values?.productdata[index]?.rate == "NaN"
    ) {
      errors.rate = "rate is required ";
    }
    if (
      !values?.productdata[index]?.amount ||
      values?.productdata[index]?.amount == "NaN"
    ) {
      errors.amount = "amount is required ";
    }
  });

  return errors;
}
