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
  max-width: 1000px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TicketCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  background: ${(props) =>
    props.status === "Open"
      ? "#ffdddd"
      : props.status === "In Progress"
      ? "#fff3cd"
      : "#d4edda"};
  color: ${(props) =>
    props.status === "Open"
      ? "#d9534f"
      : props.status === "In Progress"
      ? "#856404"
      : "#155724"};
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

class AdminDashboard extends React.Component {
  static contextType = AuthContext;
  state = {
    tickets: [],
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

  handleStatusChange = async (ticketId, status) => {
    const { token } = this.context;
    await axios.put(
      `http://localhost:5000/api/tickets/${ticketId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    this.fetchTickets();
  };
  render() {
    return (
      <>
        <Navbar />
        <DashboardContainer>
          <DashboardWrapper>
            <Title>Admin Dashboard</Title>
            <TicketGrid>
              {this.state.tickets.map((ticket) => (
                <TicketCard key={ticket._id}>
                  <h3>Title: {ticket.title}</h3>
                  <p>Description: {ticket.description}</p>
                  <p>Created by: {ticket.createdBy?.username}</p>
                  <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                  <Select
                    value={ticket.status}
                    onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </Select>
                </TicketCard>
              ))}
            </TicketGrid>
          </DashboardWrapper>
        </DashboardContainer>
      </>
    );
  }
}

export default AdminDashboard;
