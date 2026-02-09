import "./UpdateUser.css";

function UpdateUser() {
  return (
    <div className="update-user">
      <form className="update-user__form">
        <div className="form-row">
          <div className="form-group">
            <label>ID</label>
            <input type="text" placeholder="ID" disabled />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <div className="form-group">
            <label>Nickname</label>
            <input type="text" placeholder="Nickname" />
          </div>
        </div>

        <div className="form-group full">
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>

        <div className="button-row">
          <button type="button" className="btn danger">
            회원 탈퇴
          </button>

          <button type="submit" className="btn primary">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
