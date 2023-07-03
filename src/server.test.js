import fetch from "isomorphic-fetch";
import { app } from "./server";

const API_URL = "http://localhost:4000/api";

const addUser = (userData) => {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: userData ? { "Content-Type": "application/json" } : {},
  });
};

const getUsers = () => {
  return fetch(`${API_URL}/users`, {
    method: "GET",
  });
};

const getUsersById = (uuid) => {
  return fetch(`${API_URL}/users/${uuid}`, {
    method: "GET",
  });
};

describe("Testing CRUD API", () => {
  // beforeAll(() => {
  //   jest.useFakeTimers();
  // });

  // afterAll(() => {
  //   jest.useRealTimers();
  // });

  test("should return 200 and empty array for get users", async () => {
    const initialUserResponse = await getUsers();
    expect(initialUserResponse.status).toBe(200);
    expect(await initialUserResponse.json()).toEqual([]);
  });

  test("should return 201 and added user and should retreive user by id", async () => {
    const userData = {
      username: "Mock User",
      age: 20,
      hobbies: ["Sports", "Cooking"],
    };
    const addUserResponse = await addUser(userData);
    expect(addUserResponse.status).toBe(201);
    const data = await addUserResponse.json();
    const uuid = data["id"];
    const getUserResponse = await getUsersById(uuid);
    console.log(getUserResponse);
    expect(getUserResponse.status).toBe(200);
  });

  test("should return 400 for invalid user uuid", async () => {
    const brockenUUID = "123";
    const getUserResponse = await getUsersById(brockenUUID);
    expect(getUserResponse.status).toBe(400);
  });
});
