import { Component, Fragment } from "react";
import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";

class UserFinder extends Component {
  static contextType = UsersContext; // You can use only one context here
  constructor() {
    super();
    this.state = {
      //filteredUsers: DUMMY_USERS, // Ex: Fetch From API
      filteredUsers: [],
      searchTerm: "",
    };
  }

  // This is the same as useEffect without dependency
  componentDidMount() {
    // Send http resquest
    this.setState({ filteredUsers: this.context.users });
  }

  // This is the same as useEffect with dependency
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

export default UserFinder;
