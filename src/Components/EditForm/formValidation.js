export function ProductValidate(values, Product_data) {
  let errors = {};
  if (!values?.product_name) {
    errors.product_name = "product name is required";
  }

  if (!values?.product_type) {
    errors.product_type = "product type is required";
  }
  if (!values?.weight) {
    errors.weight = "weight is required";
  }
  if (!values?.hsn) {
    errors.hsn = "HSN is required";
  }

  return errors;
}

export function CustomerValidate(values, data) {
  let errors = {};

  if (!values?.customer_name) {
    errors.customer_name = " Customer name is required";
  }

  if (!values?.mobile_no) {
    errors.mobile_no = "Mobile No is required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      parseInt(values?.mobile_no)
    )
  ) {
    errors.mobile_no = "mobile number is invalid";
  }

  if (!values?.address) {
    errors.address = "Adress is  required";
  }

  return errors;
}
export function TaxValidate(values, data) {
  let errors = {};

  if (!values?.tax_name) {
    errors.tax_name = " tax name is required";
  }

  if (!values?.tax_rate) {
    errors.tax_rate = "Tax_Rate  is required";
  }

  if (!values?.tax_country) {
    errors.tax_country = "tax_country is required";
  }

  return errors;
}
export function CompanyValidate(values) {
  let errors = {};

  if (!values?.company_address) {
    errors.company_address = " company address is required";
  }

  if (!values?.company_name) {
    errors.company_name = "Company Name is required";
  }

  if (!values?.image_src) {
    errors.image_src = "image  is required";
  }
  if (!values?.mobile_no) {
    errors.mobile_no = "mobile no is required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      parseInt(values?.mobile_no)
    )
  ) {
    errors.mobile_no = "mobile number is invalid";
  }
  if (!values?.phone_no) {
    errors.phone_no = "phone no is required";
  }
  if (!values?.terms_condition) {
    errors.terms_condition = "terms condition is required";
  }
  if (!values?.tin_gst_no) {
    errors.tin_gst_no = "tin gst no is required";
  }
  if (!values?.website) {
    errors.website = "website is required";
  }

  return errors;
}
export function UserValidate(values) {
  let errors = {};

  if (!values?.name) {
    errors.name = "name is required";
  }

  if (!values?.role_id) {
    errors.role_id = "Role is required";
  }
  if (!values?.company_id) {
    errors.company_id = "company name is required";
  }

  if (!values?.address) {
    errors.address = "Address is required";
  }
  if (!values?.mobile_no) {
    errors.mobile_no = "mobile number is missing ";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
      parseInt(values?.mobile_no)
    )
  ) {
    errors.mobile_no = "mobile number is invalid";
  }

  if (!values?.email) {
    errors.email = "Email id is missing";
  } else if (!/\S+@\S+\.\S+/.test(values?.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values?.password) {
    errors.password = "Password is missing";
  } else if (values?.password?.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }

  return errors;
}
