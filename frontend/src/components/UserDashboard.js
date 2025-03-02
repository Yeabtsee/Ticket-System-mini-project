import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import AuthContext from "../context/auth";
import styled from "styled-components";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f4f6f9;
  padding: 20px;
`;

const DashboardWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #0056b3;
  }
`;

const TicketList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TicketItem = styled.li`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

class UserDashboard extends React.Component {
  static contextType = AuthContext;

  state = {
    tickets: [],
    title: "",
    description: "",
  };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    const { token } = this.context;
    try {
      const res = await axios.get("http://localhost:5000/api/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.setState({ tickets: res.data });
    } catch (err) {
      alert("Failed to fetch tickets");
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = this.context;
    try {
      await axios.post(
        "http://localhost:5000/api/tickets",
        {
          title: this.state.title,
          description: this.state.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.fetchTickets();
      this.setState({ title: "", description: "" });
    } catch (err) {
      alert("Failed to create ticket");
    }
  };

  render() {
    return (
      <>
        <Navbar />
        <DashboardContainer>
          <DashboardWrapper>
            <Title>My Tickets</Title>
            <Form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <TextArea
                placeholder="Description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
              <Button type="submit">Create Ticket</Button>
            </Form>
            <TicketList>
              {this.state.tickets.map((ticket) => (
                <TicketItem key={ticket._id}>
                  <h3>Title: {ticket.title}</h3>
                  <p>Description: {ticket.description}</p>
                  <p>Status: {ticket.status}</p>
                </TicketItem>
              ))}
            </TicketList>
          </DashboardWrapper>
        </DashboardContainer>
      </>
    );
  }
}

export default UserDashboard;
