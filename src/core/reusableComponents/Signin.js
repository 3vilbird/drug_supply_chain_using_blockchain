import React, { useState, useEffect } from "react";
import web3 from "../../etherium/web3";
import { Login } from "../../etherium/Factory";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Signin = (setLoadsignin = (f) => f, loadsignin = undefined) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    loading: false,
    error: false,
  });
  const [redirect, setRedirect] = useState({
    admin: false,
    manu: false,
    whole: false,
    disrti: false,
    pharma: false,
    shipper: false,
  });

  const { email, loading, error } = userInfo;
  const { admin, manu, whole, disrti, pharma, shipper } = redirect;

  const handlechange = (name) => (event) => {
    setUserInfo({ ...userInfo, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(userInfo);

    if (email != "") {
      try {
        setUserInfo({ ...userInfo, loading: true });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const data = await Login(sender, email);
        console.log("data returned from the log in==> ", data);
        // if the user is not in db it returns  0
        // USER VALIDATION AND REDIRECTION
        // ROLE 1=>ADMIN ; 2=>MANU ;3=>WHOLESELLER; 4=>DISTRIBUTOR 5=>PHARMA 6=>SHIPPER
        if (email !== data[0]) {
          setUserInfo({ ...userInfo, error: true, loading: false, email: "" });
          setUserInfo({ ...userInfo, loading: false });
          alert("Invalid username or  account, access denied ");
        } else {
          // success case

          setUserInfo({ ...userInfo, loading: false });
          console.log("success");
          switch (data[1]) {
            case "1":
              setRedirect({ ...redirect, admin: true });
              break;
            case "2":
              setRedirect({ ...redirect, manu: true });
              break;
            case "3":
              setRedirect({ ...redirect, whole: true });
              break;
            case "4":
              setRedirect({ ...redirect, disrti: true });
              break;
            case "5":
              setRedirect({ ...redirect, pharma: true });
              break;
            case "6":
              setRedirect({ ...redirect, shipper: true });
              break;

            default:
              break;
          }
        }
      } catch (error) {
        console.log("we got some error Log in page ==>", error);
        alert("access denied");
        setUserInfo({ ...userInfo, loading: false });
      }
    } else {
      alert("plase enter the username");
    }
  };

  const redirector = () => {
    if (admin) {
      return <Redirect to="/admin" />;
    }
    if (manu) {
      return <Redirect to="/home" />;
    }
    if (whole) {
      return <Redirect to="/wholeseller" />;
    }
    if (disrti) {
      return <Redirect to="/distributor" />;
    }
    if (pharma) {
      return <Redirect to="/pharma" />;
    }
    if (shipper) {
      return <Redirect to="/shipper" />;
    }
  };

  const signTamp = () => (
    <div>
      <div className="form-group ">
        <label className="text  col-6" style={{ fontSize: "1.5rem" }}>
          username
        </label>
        <input
          className="form-control"
          type="text"
          onChange={handlechange("email")}
          placeholder="Email id"
          value={email}
        />
      </div>
      <Button inverted color="purple" onClick={onSubmit} loading={loading}>
        Log in ..
      </Button>
    </div>
  );

  return (
    <div>
      {error ? (
        <ErrorMessage message="Invalid creentials" hea="Access Denied" />
      ) : (
        ""
      )}
      {signTamp()}
      {redirector()}
    </div>
  );
};

export default Signin;
