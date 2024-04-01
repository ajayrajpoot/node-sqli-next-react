"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
 
import withAuth from "../../lib/withAuth";
import { getUsers, addUsers, updateUsers, deleteUsers } from "../../api/user";
import config from "../../static/config.json";
// import "./style";
// Define interface for user object

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: number;
  isAdmin: number;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    status: 0,
    isAdmin: 0,
    role: "",
  });
  const [editedUsers, setEditedUsers] = useState<{
    [key: string]: User | undefined;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try { 
        const data = await getUsers();
        setUsers(data.data); 
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleAddUser = async () => {
    // Check if any field is empty
    if (
      !newUser.username ||
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.password
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      // const response = await fetch(
      //   `${config.NEXT_PUBLIC_API_BASE_URL}/api/users/add`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "content-type": "application/json",
      //       authorization: localStorage.getItem("token") ?? "",
      //     },
      //     body: JSON.stringify(newUser),
      //   }
      // );
      let response = await addUsers(newUser)
      if (response.success) {
        toast.success("New user added successfully");
        fetchUsers(); // Refresh the user list
        setNewUser({
          id: 0,
          username: "",
          name: "",
          email: "",
          phone: "",
          password: "",
          status: 0,
          isAdmin: 0,
          role: "",
        });
      } else {
        console.error("Failed to add new user:", response.message);
        toast.error("Failed to add new user");
      }
    } catch (error) {
      console.error("Error adding new user:", error);
      toast.error("An error occurred while adding new user");
    }
  };

  const handleEditUser = (userId: number, fieldName: string, value: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...(prev[userId] || {}), [fieldName]: value },
    }));
  };

  const handleSaveEdit = async (userId: number) => {
    setIsLoading(true);

    // Check if any field is empty
    const user = editedUsers[userId];
    for (const field in user) {
      if (!user[field as keyof User]) {
        toast.error(`${field} is required`);
        setIsLoading(false);
        return;
      }
    }

    try {
      
      let response = await updateUsers(userId, user)
      if (response.success) {
        toast.success("User details updated successfully");
        fetchUsers(); // Refresh the user list
        setEditedUsers((prev) => ({ ...prev, [userId]: undefined }));
      } else {
        console.error("Failed to update user details:", response.message);
        toast.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred while updating user details");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    setIsLoading(true);

    try {
      
      let response:any = await deleteUser(userId) 
      if (response.success) {
        toast.success("User details updated successfully");
        fetchUsers(); // Refresh the user list
      } else {
        console.error("Failed to update user details:", response.message);
        toast.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred while updating user details");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatus = async (userId: number, status: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${config.NEXT_PUBLIC_API_BASE_URL}/api/users/status/${userId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("token") ?? "",
          },
          body: JSON.stringify({ status: status }),
        }
      );
      if (response.ok) {
        toast.success("User details updated successfully");
        fetchUsers(); // Refresh the user list
      } else {
        console.error("Failed to update user details:", response.statusText);
        toast.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred while updating user details");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <body className="bg-dark">
        <div className="container">
          <h1 className="my-4">User List</h1>
          <div className="row mb-3">
            <div className="col">
              <Form.Control
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <Form.Control
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <Form.Control
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <Form.Control
                type="text"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <Form.Control
                type="text"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="col">
              <Form.Select
                aria-label="Role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                {/* Add more options as needed */}
              </Form.Select>
            </div>
            <div className="col-auto">
              <Button variant="primary" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.username + "" + (user.isAdmin ? " (Admin)" : "")
                      ) : (
                        <Form.Control
                          type="text"
                          value={
                            editedUsers[user.id]?.username || user.username
                          }
                          onChange={(e) =>
                            handleEditUser(user.id, "username", e.target.value)
                          }
                          className="form-control"
                        />
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.name
                      ) : (
                        <Form.Control
                          type="text"
                          value={editedUsers[user.id]?.name || user.name}
                          onChange={(e) =>
                            handleEditUser(user.id, "name", e.target.value)
                          }
                          className="form-control"
                        />
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.email
                      ) : (
                        <Form.Control
                          type="text"
                          value={editedUsers[user.id]?.email || user.email}
                          onChange={(e) =>
                            handleEditUser(user.id, "email", e.target.value)
                          }
                          className="form-control"
                        />
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.phone
                      ) : (
                        <Form.Control
                          type="text"
                          value={editedUsers[user.id]?.phone || user.phone}
                          onChange={(e) =>
                            handleEditUser(user.id, "phone", e.target.value)
                          }
                          className="form-control"
                        />
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        "***"
                      ) : (
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            handleEditUser(user.id, "password", e.target.value)
                          }
                          className="form-control"
                        />
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.status ? (
                          "Active"
                        ) : (
                          "Inactive"
                        )
                      ) : (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={user.status ? true : false}
                            onChange={() =>
                              updateUserStatus(user.id, user.status ? 0 : 1)
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      )}
                    </td>
                    <td>
                      {!editedUsers[user.id] ? (
                        user.role
                      ) : (
                        <Form.Select
                          aria-label="Role"
                          value={newUser.role}
                          onChange={(e) =>
                            handleEditUser(user.id, "role", e.target.value)
                          }
                        >
                          <option value="">Select role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          {/* Add more options as needed */}
                        </Form.Select>
                      )}
                    </td>

                    <td>
                      {!editedUsers[user.id] ? (
                        <Button
                          onClick={() =>
                            setEditedUsers((prev) => ({
                              ...prev,
                              [user.id]: {},
                            }))
                          }
                          variant="primary"
                        >
                          <FaEdit />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleSaveEdit(user.id)}
                            disabled={isLoading}
                            variant="primary"
                          >
                            {isLoading ? "Saving..." : "Save"}
                          </Button>

                          <Button
                            onClick={() =>
                              setEditedUsers((prev) => ({
                                ...prev,
                                [user.id]: undefined,
                              }))
                            }
                            disabled={isLoading}
                            variant="primary"
                          >
                            {isLoading ? "Saving..." : "Cancel"}
                          </Button>
                        </>
                      )}

                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="danger"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ToastContainer />
        </div>
      </body>
    </>
  );
};

export default withAuth(UserList);
