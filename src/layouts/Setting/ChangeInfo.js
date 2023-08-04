import { useEffect, useState } from "react";

const ChangeInfo = () => {
//   const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:3005/accounts/${
        JSON.parse(sessionStorage.getItem("token")).id
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setUserName(data.userName);
      });
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      userName: userName,
      password: JSON.parse(sessionStorage.getItem("token")).password,
      role: JSON.parse(sessionStorage.getItem("token")).role,
      avatar: JSON.parse(sessionStorage.getItem("token")).avatar,
      createDate: JSON.parse(sessionStorage.getItem("token")).create,
      status: JSON.parse(sessionStorage.getItem("token")).status,
    };
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(
      `http://localhost:3005/accounts/${
        JSON.parse(sessionStorage.getItem("token")).id
      }`,
      option
    )
      .then((res) => res.json())
      .then(() => {
        alert("Cập nhật thành công !");
        window.location.reload();
      });
  };

  return (
    <>
      <div class="col-md-8 offset-md-2">
        <span class="anchor" id="formUserEdit"></span>
        <hr class="my-5" />

        <div class="card card-outline-secondary">
          <div class="card-header">
            <h3 class="mb-0">User Information</h3>
          </div>
          <div class="card-body">
            <form
              class="form"
              autocomplete="off"
              onSubmit={(e) => handleChange(e)}
            >
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">
                  Name
                </label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">
                  Email
                </label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">
                  User Name
                </label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label"></label>
                <div class="col-lg-9">
                  <input
                    type="reset"
                    class="btn btn-secondary"
                    value="Cancel"
                  />
                  <input
                    type="submit"
                    class="btn btn-primary"
                    value="Save Changes"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeInfo;