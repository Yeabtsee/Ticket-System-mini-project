import React from "react";
import axios from "axios";
import AuthContext from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../Assets/login.css";

function withNavigation(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
      role: "user", // Default role is "user"
    };
  }

  toggleForm = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email, confirmPassword, role, isSignIn } =
      this.state;

    try {
      if (isSignIn) {
        // 🔥 Login API Call
        const res = await axios.post("http://localhost:5000/api/login", {
          username,
          password,
        });
        this.context.login(res.data.token, res.data.role);
        this.props.navigate(
          res.data.role === "admin" ? "/admin" : "/dashboard"
        );
      } else {
        // 🔥 Signup API Call
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        await axios.post("http://localhost:5000/api/signup", {
          username,
          email,
          password,
          role,
        });
        alert("Signup successful! Please log in.");
        this.toggleForm(); // Switch to login form after signup
      }
    } catch (err) {
      console.log(err);
      alert(
        "Something went wrong! " +
          (err.response?.data?.message || "Please try again.")
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`container ${this.state.isSignIn ? "signinForm" : ""}`}>
          {/* Sign Up Form */}
          <div className="form signup">
            <h2>Sign Up</h2>
            <div className="inputBox">
              <input
                type="text"
                required
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                disabled={this.state.isSignIn}
              />
              <i className="fa-regular fa-user"></i>
              <span>Username</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                disabled={this.state.isSignIn}
              />
              <i className="fa-regular fa-envelope"></i>
              <span>Email Address</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                disabled={this.state.isSignIn}
              />
              <i className="fa-solid fa-lock"></i>
              <span>Create Password</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                disabled={this.state.isSignIn}
              />
              <i className="fa-solid fa-lock"></i>
              <span>Confirm Password</span>
            </div>

            {/* Role Selection */}
            <div className="Role">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={this.state.role === "admin"}
                  onChange={this.handleChange}
                  disabled={this.state.isSignIn}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={this.state.role === "user"}
                  onChange={this.handleChange}
                  disabled={this.state.isSignIn}
                />
                User
              </label>
            </div>

            <div className="inputBox">
              <input
                type="submit"
                value="Create Account"
                disabled={this.state.isSignIn}
              />
            </div>
            <p>
              Already a member?{" "}
              <a href="#" onClick={this.toggleForm}>
                Log in
              </a>
            </p>
          </div>

          {/* Sign In Form */}
          <div className="form signin">
            <h2>Sign In</h2>
            <div className="inputBox">
              <input
                type="text"
                required
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                disabled={!this.state.isSignIn}
              />
              <i className="fa-regular fa-user"></i>
              <span>Username</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                disabled={!this.state.isSignIn}
              />
              <i className="fa-solid fa-lock"></i>
              <span>Password</span>
            </div>
            <div className="inputBox">
              <input
                type="submit"
                value="Login"
                disabled={!this.state.isSignIn}
              />
            </div>
            <p>
              Not Registered?{" "}
              <a href="#" onClick={this.toggleForm}>
                Create an account
              </a>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

export default withNavigation(Login);
