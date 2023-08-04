import { useRef, useState } from "react";

const ChangePass = () => {
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  const errorNewPass = useRef();
  const errorConfirmPass = useRef();

  const listInputs = [newpass, confirmpass];
  const listErrors = [errorNewPass, errorConfirmPass];

  const checkConfirm = () => {
    if (listInputs.every(listInput => listInput !== '') && newpass === confirmpass) {
        return 1;
    } else if (listInputs.every(listInput => listInput !== '') && newpass !== confirmpass) {
        return 2;
    } else if (listInputs.some(listInput => listInput === '')) {
        return 3;
    }
}

const checkValidate = () => {
    if (listInputs.every(listInput => listInput === '')) {
        listErrors.forEach(listError =>
            listError.current.style.display = 'block'
        )
    }
    for (var i = 0; i < listInputs.length; i++) {
        if (listInputs[i] !== '') {
            listErrors[i].current.style.display = 'none'
            for (var j = 0; j < listInputs.length; j++) {
                if (i !== j && listInputs[i] === '') {
                    listErrors[j].current.style.display = 'block';
                }
            }
        }
    }
}


  const handleChange = (e) => {
    e.preventDefault();
    if(checkConfirm() === 1) {
        const data = {
          name: JSON.parse(sessionStorage.getItem("token")).name,
          email: JSON.parse(sessionStorage.getItem("token")).email,
          userName: JSON.parse(sessionStorage.getItem("token")).userName,
          password: newpass,
          role: JSON.parse(sessionStorage.getItem("token")).role,
          avatar: JSON.parse(sessionStorage.getItem("token")).avatar,
          createDate: JSON.parse(sessionStorage.getItem("token")).create,
          status: JSON.parse(sessionStorage.getItem("token")).status,
        };
        const option = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
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
            alert("Đổi mật khẩu thành công");
            window.location.reload();
          });
    } else if (checkConfirm() === 2) {
      alert('Mật khẩu nhập vào sai!')
    } else if(checkConfirm() === 3) {
      checkValidate()
    }
  };

  return (
    <>
      <div class="col-md-6 offset-md-3">
        <span class="anchor" id="formChangePassword"></span>
        <hr class="mb-5" />

        <div class="card card-outline-secondary">
          <div class="card-header">
            <h3 class="mb-0">Change Password</h3>
          </div>
          <div class="card-body">
            <form
              class="form"
              autocomplete="off"
              onSubmit={(e) => handleChange(e)}
            >
              <div class="form-group">
                <label for="inputPasswordNew">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPasswordNew"
                  value={newpass}
                  onChange={(e) => setNewpass(e.target.value)}
                />
                <span
                  style={{ display: "none", color: "red" }}
                  ref={errorNewPass}
                >
                  Vui lòng nhập mật khẩu mới
                </span>
              </div>
              <div class="form-group">
                <label for="inputPasswordNewVerify">Confirm password</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPasswordNewVerify"
                  value={confirmpass}
                  onChange={(e) => setConfirmpass(e.target.value)}
                />
                <span
                  style={{ display: "none", color: "red" }}
                  ref={errorConfirmPass}
                >
                  Để xác nhận, hãy nhập lại mật khẩu mới.
                </span>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-success btn-lg float-right"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;